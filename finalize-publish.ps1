$ErrorActionPreference = 'Stop'

$workspaceRoot = 'C:\Users\Aditya\Downloads\invitation-main'
$publishRoot = 'C:\Users\Aditya\Downloads\invitation-publish'
$owner = 'adityadubey1313-oss'
$gitExe = 'C:\Program Files\Git\cmd\git.exe'

New-Item -ItemType Directory -Force -Path $publishRoot | Out-Null

$credText = @'
protocol=https
host=github.com

'@ | & $gitExe credential fill
if (-not $credText) { throw 'GitHub credentials were not found.' }

$credMap = @{}
foreach ($line in ($credText -split "`r?`n")) {
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    $parts = $line.Split('=', 2)
    if ($parts.Length -eq 2) { $credMap[$parts[0]] = $parts[1] }
}

if (-not $credMap.ContainsKey('username') -or -not $credMap.ContainsKey('password')) {
    throw 'GitHub username/password were not readable from git credential storage.'
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
    $repoApi = 'https://api.github.com/user/repos'
    $payload = @{ name = $repoName; private = $false; has_issues = $true; has_projects = $true; has_wiki = $false; auto_init = $false; default_branch = 'main' } | ConvertTo-Json -Compress

    try {
        Invoke-RestMethod -Method Post -Uri $repoApi -Headers $headers -Body $payload -ContentType 'application/json' | Out-Null
        Write-Output "Created repo: $repoName"
    }
    catch {
        $status = $_.Exception.Response.StatusCode.value__
        if ($status -eq 422) { Write-Output "Exists: $repoName" }
        elseif ($status -eq 401) { throw 'GitHub auth rejected.' }
        else { throw }
    }

    $cloneDir = Join-Path $publishRoot $repoName
    if (Test-Path $cloneDir) { Remove-Item -Recurse -Force $cloneDir }
    & $gitExe clone "https://github.com/$owner/$repoName.git" $cloneDir | Out-Null
    & $gitExe -C $cloneDir checkout -B main | Out-Null
    Copy-Item -Recurse (Join-Path $project.Source '*') -Destination $cloneDir -Force

    $wfDir = Join-Path $cloneDir '.github/workflows'
    New-Item -ItemType Directory -Force -Path $wfDir | Out-Null
    $workflowSource = Join-Path (Join-Path $workspaceRoot '.github\workflows') $project.Workflow
    Copy-Item $workflowSource -Destination $wfDir -Force

    & $gitExe -C $cloneDir add .
    & $gitExe -C $cloneDir -c user.name='aditya' -c user.email='aditya.dubey1313@gmail.com' commit -m "Deploy $repoName" --allow-empty | Out-Null
    & $gitExe -C $cloneDir push origin main | Out-Null
    Write-Output "Pushed: $repoName"

    $pagesUri = "https://api.github.com/repos/$owner/$repoName/pages"
    try {
        Invoke-RestMethod -Method Post -Uri $pagesUri -Headers $headers -Body '{"build_type":"workflow"}' -ContentType 'application/json' | Out-Null
        Write-Output "Pages enabled: $repoName"
    }
    catch {
        $status = $_.Exception.Response.StatusCode.value__
        if ($status -ne 200 -and $status -ne 201 -and $status -ne 202 -and $status -ne 409) { throw "Pages setup failed for $repoName" }
    }

    $dispatchUri = "https://api.github.com/repos/$owner/$repoName/actions/workflows/$($project.Workflow)/dispatches"
    Invoke-RestMethod -Method Post -Uri $dispatchUri -Headers $headers -Body '{"ref":"main"}' -ContentType 'application/json' | Out-Null
    Write-Output "Workflow triggered: $repoName"
    Write-Output "URL: https://adityadubey1313-oss.github.io/$repoName/"
}

Write-Output 'Complete.'
