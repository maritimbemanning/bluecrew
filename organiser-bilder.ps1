# Bluecrew - Bildeorganisering
# Kjør dette scriptet for å se bildene og flytte dem enkelt

$sourcePath = "c:\dev\bluecrew\public\Bilder AI"
$images = Get-ChildItem "$sourcePath\*.PNG"

Write-Host "=" -ForegroundColor Cyan
Write-Host "BLUECREW - BILDEORGANISERING" -ForegroundColor Cyan
Write-Host "=" -ForegroundColor Cyan
Write-Host ""

Write-Host "Du har $($images.Count) bilder i 'Bilder AI'-mappen" -ForegroundColor Green
Write-Host ""

# Vis bildene
$i = 1
foreach ($img in $images) {
    $sizeMB = [math]::Round($img.Length / 1MB, 2)
    Write-Host "[$i] $($img.Name) - $sizeMB MB" -ForegroundColor Yellow
    $i++
}

Write-Host ""
Write-Host "RASK GUIDE:" -ForegroundColor Cyan
Write-Host "1. Åpne Windows Explorer: c:\dev\bluecrew\public" -ForegroundColor White
Write-Host "2. Se på bildene i 'Bilder AI'-mappen" -ForegroundColor White
Write-Host "3. Velg BESTE bilde → Dra til 'hero/'" -ForegroundColor White
Write-Host "4. Gi det navnet: maritime-hero.png" -ForegroundColor White
Write-Host "5. Ferdig! (Resten er valgfritt)" -ForegroundColor White
Write-Host ""

# Åpne Explorer automatisk
$response = Read-Host "Vil du åpne mappen i Explorer nå? (j/n)"
if ($response -eq "j" -or $response -eq "J") {
    Start-Process explorer.exe "c:\dev\bluecrew\public"
    Write-Host "✓ Explorer åpnet!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Når du har flyttet bildene, si: 'Aktiver bildene i koden'" -ForegroundColor Cyan
