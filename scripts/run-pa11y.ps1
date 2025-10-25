$env:NEXT_DISABLE_TURBOPACK='1'
$proc = Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev' -WorkingDirectory 'C:\dev\bluecrew' -PassThru
Write-Output "started $($proc.Id)"
$ready=$false
for ($i=0; $i -lt 60 -and -not $ready; $i++) {
  try {
    Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop | Out-Null
    Write-Output 'ready'
    $ready = $true
    break
  } catch {
    Start-Sleep -Seconds 1
  }
}
if (-not $ready) { Write-Error 'server not responding'; exit 1 }
Write-Output 'running pa11y home'
npx pa11y http://localhost:3000/ --reporter json > docs/pa11y-home.json
Write-Output 'home done'
npx pa11y http://localhost:3000/jobbsoker --reporter json > docs/pa11y-jobbsoker.json
Write-Output 'jobbsoker done'
npx pa11y http://localhost:3000/kunde --reporter json > docs/pa11y-kunde.json
Write-Output 'kunde done'
if ($proc -and -not $proc.HasExited) { Stop-Process -Id $proc.Id -Force }
Write-Output 'finished'