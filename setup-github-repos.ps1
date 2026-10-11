param(
    [string]$WorkspaceRoot = "c:\Users\Aditya\Downloads\invitation-main",
    [string]$GithubOrg = "adityadubey1313-oss",
    [switch]$DryRun = $true
)

$projects = @(
    @{ Name = "adisiddhi_1"; Source = Join-Path $WorkspaceRoot "_1" },
    @{ Name = "adisiddhi_2"; Source = Join-Path $WorkspaceRoot "_2" },
    @{ Name = "adisiddhi_3"; Source = Join-Path $WorkspaceRoot "_3" },
    @{ Name = "adisiddhi_4"; Source = Join-Path $WorkspaceRoot "_4" }
)

foreach ($project in $projects) {
    $repoPath = Join-Path (Join-Path $WorkspaceRoot "repos") $project.Name
    $repoUrl = "https://github.com/$GithubOrg/$($project.Name).git"

    Write-Host ""
    Write-Host "Project: $($project.Name)"
    Write-Host "Repo URL: $repoUrl"
    Write-Host "Source folder: $($project.Source)"
    Write-Host "Target folder: $repoPath"

    if ($DryRun) {
        Write-Host "[Dry run] Create repo folder and copy files here when ready."
        Write-Host "git clone $repoUrl"
        Write-Host "cd $($project.Name)"
        Write-Host "Copy-Item -Recurse '$($project.Source)\*' -Destination '.'"
        Write-Host "git add ."
        Write-Host "git commit -m 'Add $($project.Name) invitation project'"
        Write-Host "git push -u origin main"
        Write-Host "Open GitHub > Settings > Pages > Source = GitHub Actions"
        Write-Host "Open Actions > Run 'Deploy Pages $($project.Name.Replace('adisiddhi_', ''))'"
    }
    else {
        New-Item -ItemType Directory -Force -Path $repoPath | Out-Null
        Copy-Item -Recurse (Join-Path $project.Source "*") -Destination $repoPath -Force
        Write-Host "Repository scaffold prepared at: $repoPath"
    }
}

Write-Host ""
Write-Host "Final publish sequence:"
Write-Host "1. Push each repo to GitHub"
Write-Host "2. Enable Pages in each repo with GitHub Actions"
Write-Host "3. Run the matching deployment workflow"
Write-Host "4. Verify the Pages URL loads successfully"
