$ErrorActionPreference = 'Stop'

$workspaceRoot = 'C:\Users\Aditya\Downloads\invitation-main'
$publishRoot = 'C:\Users\Aditya\Downloads\invitation-publish'
$owner = 'adityadubey1313-oss'

New-Item -ItemType Directory -Force -Path $publishRoot | Out-Null

$credText = @'
protocol=https
host=github.com

'@ | git credential fill
if (-not $credText) { throw 'GitHub authentication was not found. Configure git credentials before publishing.' }

$credMap = @{}
foreach ($line in ($credText -split "`r?`n")) {
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    $parts = $line.Split('=', 2)
    if ($parts.Length -eq 2) { $credMap[$parts[0]] = $parts[1] }
}

if (-not $credMap.ContainsKey('username') -or -not $credMap.ContainsKey('password')) {
    throw 'GitHub username/password could not be read from git credential storage.'
}

$user = $credMap['username']
$pass = $credMap['password']
$basic = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("${user}:${pass}"))
$headers = @{
    Authorization = "Basic $basic"
    Accept = 'application/vnd.github+json'
    'X-GitHub-Api-Version' = '2022-11-28'
}

$projects = @(
    @{ Name = 'adisiddhi_1'; Source = Join-Path $workspaceRoot '_1'; Workflow = 'deploy-pages-_1.yml' },
    @{ Name = 'adisiddhi_2'; Source = Join-Path $workspaceRoot '_2'; Workflow = 'deploy-pages-_2.yml' },
    @{ Name = 'adisiddhi_3'; Source = Join-Path $workspaceRoot '_3'; Workflow = 'deploy-pages-_3.yml' },
    @{ Name = 'adisiddhi_4'; Source = Join-Path $workspaceRoot '_4'; Workflow = 'deploy-pages-_4.yml' }
)

foreach ($project in $projects) {
    $repoName = $project.Name
    $repoUri = 'https://api.github.com/user/repos'
    $payload = @{ name = $repoName; private = $false; has_issues = $true; has_projects = $true; has_wiki = $false; auto_init = $false; default_branch = 'main' } | ConvertTo-Json -Compress

    try {
        Invoke-RestMethod -Method Post -Uri $repoUri -Headers $headers -Body $payload -ContentType 'application/json' | Out-Null
        Write-Output "Created repo: $repoName"
    }
    catch {
        $status = $_.Exception.Response.StatusCode.value__
        if ($status -eq 422) { Write-Output "Repo already exists: $repoName" }
        elseif ($status -eq 401) { throw 'GitHub credentials rejected by API.' }
        else { throw }
    }

    $cloneDir = Join-Path $publishRoot $repoName
    if (Test-Path $cloneDir) { Remove-Item -Recurse -Force $cloneDir }

    git clone "https://github.com/$owner/$repoName.git" $cloneDir | Out-Null
    git -C $cloneDir checkout -B main | Out-Null
    Copy-Item -Recurse (Join-Path $project.Source '*') -Destination $cloneDir -Force

    $wfDir = Join-Path $cloneDir '.github/workflows'
    New-Item -ItemType Directory -Force -Path $wfDir | Out-Null
    $workflowSource = Join-Path (Join-Path $workspaceRoot '.github\workflows') $project.Workflow
    Copy-Item $workflowSource -Destination $wfDir -Force

    git -C $cloneDir add .
    git -C $cloneDir -c user.name='aditya' -c user.email='aditya.dubey1313@gmail.com' commit -m "Deploy $repoName" --allow-empty | Out-Null
    git -C $cloneDir push origin main | Out-Null
    Write-Output "Pushed repo: $repoName"

    $pagesUri = "https://api.github.com/repos/$owner/$repoName/pages"
    $pagesBody = '{"build_type":"workflow"}'
    try {
        Invoke-RestMethod -Method Put -Uri $pagesUri -Headers $headers -Body $pagesBody -ContentType 'application/json' | Out-Null
        Write-Output "Enabled Pages for: $repoName"
    }
    catch {
        $status = $_.Exception.Response.StatusCode.value__
        if ($status -ne 200 -and $status -ne 201 -and $status -ne 202) { throw "Failed to enable Pages for $repoName" }
    }

    $dispatchUri = "https://api.github.com/repos/$owner/$repoName/actions/workflows/$($project.Workflow)/dispatches"
    $dispatchBody = '{"ref":"main"}'
    Invoke-RestMethod -Method Post -Uri $dispatchUri -Headers $headers -Body $dispatchBody -ContentType 'application/json' | Out-Null
    Write-Output "Triggered workflow for: $repoName"
    Write-Output "Published URL: https://adityadubey1313-oss.github.io/$repoName/"
}

Write-Output 'All 4 project repos were created, pushed, and the Pages workflows were triggered.'
