# Bluecrew - Bilde Organizer (GUI versjon)
# Dette scriptet viser deg alle bildene og lar deg organisere dem

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# Paths
$sourceFolder = "C:\dev\bluecrew\public\Bilder AI"
$targetFolders = @{
    "Hero (Forside)" = "C:\dev\bluecrew\public\hero"
    "Guides (Karriereguider)" = "C:\dev\bluecrew\public\guides"
    "Operations (Kundesider)" = "C:\dev\bluecrew\public\operations"
    "Team (Om oss)" = "C:\dev\bluecrew\public\team"
}

# Suggested filenames per category
$suggestedNames = @{
    "Hero (Forside)" = @("maritime-hero.jpg", "offshore-hero.jpg", "coast-hero.jpg")
    "Guides (Karriereguider)" = @("skipsforer-hero.jpg", "matros-hero.jpg", "maskinoffiser-hero.jpg", "lonnsguide-hero.jpg", "sertifikater-hero.jpg")
    "Operations (Kundesider)" = @("bemanning-operations.jpg", "rekruttering-interview.jpg", "crew-at-work.jpg")
    "Team (Om oss)" = @("isak-ceo.jpg", "sander-operations.jpg", "team-photo.jpg")
}

# Get all images
$images = Get-ChildItem -Path $sourceFolder -Filter "*.PNG"

if ($images.Count -eq 0) {
    [System.Windows.Forms.MessageBox]::Show("Ingen bilder funnet i 'Bilder AI'-mappen!", "Feil", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error)
    exit
}

Write-Host "Fant $($images.Count) bilder i 'Bilder AI'-mappen" -ForegroundColor Green
Write-Host ""

# Create main form
$form = New-Object System.Windows.Forms.Form
$form.Text = "Bluecrew - Organiser Bilder ($($images.Count) bilder)"
$form.Size = New-Object System.Drawing.Size(1200, 800)
$form.StartPosition = "CenterScreen"
$form.FormBorderStyle = "FixedDialog"
$form.MaximizeBox = $false

# Create split container
$splitContainer = New-Object System.Windows.Forms.SplitContainer
$splitContainer.Dock = "Fill"
$splitContainer.SplitterDistance = 400
$splitContainer.Orientation = "Vertical"

# LEFT PANEL: Image list
$imageListBox = New-Object System.Windows.Forms.ListBox
$imageListBox.Dock = "Fill"
$imageListBox.Font = New-Object System.Drawing.Font("Consolas", 10)
$imageListBox.SelectionMode = "One"

# Add images to listbox
$imageIndex = 1
foreach ($img in $images) {
    $imageListBox.Items.Add("[$imageIndex] $($img.Name)") | Out-Null
    $imageIndex++
}

# LEFT PANEL: Instructions
$instructionLabel = New-Object System.Windows.Forms.Label
$instructionLabel.Text = "Klikk pa et bilde for a se preview"
$instructionLabel.Dock = "Top"
$instructionLabel.Height = 40
$instructionLabel.Font = New-Object System.Drawing.Font("Segoe UI", 11, [System.Drawing.FontStyle]::Bold)
$instructionLabel.TextAlign = "MiddleLeft"
$instructionLabel.Padding = New-Object System.Windows.Forms.Padding(10, 0, 0, 0)

$leftPanel = New-Object System.Windows.Forms.Panel
$leftPanel.Dock = "Fill"
$leftPanel.Controls.Add($imageListBox)
$leftPanel.Controls.Add($instructionLabel)

# RIGHT PANEL: Image preview and controls
$previewPictureBox = New-Object System.Windows.Forms.PictureBox
$previewPictureBox.Dock = "Top"
$previewPictureBox.Height = 400
$previewPictureBox.SizeMode = "Zoom"
$previewPictureBox.BackColor = [System.Drawing.Color]::Black
$previewPictureBox.BorderStyle = "FixedSingle"

# Info label
$infoLabel = New-Object System.Windows.Forms.Label
$infoLabel.Dock = "Top"
$infoLabel.Height = 60
$infoLabel.Font = New-Object System.Drawing.Font("Segoe UI", 10)
$infoLabel.Text = "Velg et bilde fra listen til venstre"
$infoLabel.Padding = New-Object System.Windows.Forms.Padding(10)
$infoLabel.TextAlign = "TopLeft"

# Category selection
$categoryLabel = New-Object System.Windows.Forms.Label
$categoryLabel.Text = "Velg destinasjon:"
$categoryLabel.Dock = "Top"
$categoryLabel.Height = 30
$categoryLabel.Font = New-Object System.Drawing.Font("Segoe UI", 10, [System.Drawing.FontStyle]::Bold)
$categoryLabel.Padding = New-Object System.Windows.Forms.Padding(10, 5, 0, 0)

$categoryComboBox = New-Object System.Windows.Forms.ComboBox
$categoryComboBox.Dock = "Top"
$categoryComboBox.Height = 30
$categoryComboBox.Font = New-Object System.Drawing.Font("Segoe UI", 10)
$categoryComboBox.DropDownStyle = "DropDownList"
$categoryComboBox.Items.AddRange(@("Hero (Forside)", "Guides (Karriereguider)", "Operations (Kundesider)", "Team (Om oss)"))

# Filename suggestion
$filenameLabel = New-Object System.Windows.Forms.Label
$filenameLabel.Text = "Foreslått filnavn:"
$filenameLabel.Dock = "Top"
$filenameLabel.Height = 30
$filenameLabel.Font = New-Object System.Drawing.Font("Segoe UI", 10, [System.Drawing.FontStyle]::Bold)
$filenameLabel.Padding = New-Object System.Windows.Forms.Padding(10, 5, 0, 0)

$filenameComboBox = New-Object System.Windows.Forms.ComboBox
$filenameComboBox.Dock = "Top"
$filenameComboBox.Height = 30
$filenameComboBox.Font = New-Object System.Drawing.Font("Segoe UI", 10)

# Save button
$saveButton = New-Object System.Windows.Forms.Button
$saveButton.Text = "Flytt og gi nytt navn"
$saveButton.Dock = "Top"
$saveButton.Height = 50
$saveButton.Font = New-Object System.Drawing.Font("Segoe UI", 11, [System.Drawing.FontStyle]::Bold)
$saveButton.BackColor = [System.Drawing.Color]::FromArgb(56, 189, 248)
$saveButton.ForeColor = [System.Drawing.Color]::White
$saveButton.FlatStyle = "Flat"
$saveButton.Enabled = $false
$saveButton.Margin = New-Object System.Windows.Forms.Padding(10)

# Skip button
$skipButton = New-Object System.Windows.Forms.Button
$skipButton.Text = "Hopp over dette bildet"
$skipButton.Dock = "Top"
$skipButton.Height = 40
$skipButton.Font = New-Object System.Drawing.Font("Segoe UI", 10)
$skipButton.BackColor = [System.Drawing.Color]::FromArgb(100, 100, 100)
$skipButton.ForeColor = [System.Drawing.Color]::White
$skipButton.FlatStyle = "Flat"

# Status label
$statusLabel = New-Object System.Windows.Forms.Label
$statusLabel.Dock = "Bottom"
$statusLabel.Height = 40
$statusLabel.Font = New-Object System.Drawing.Font("Segoe UI", 9)
$statusLabel.Text = "Klar til å organisere bilder..."
$statusLabel.Padding = New-Object System.Windows.Forms.Padding(10)
$statusLabel.BackColor = [System.Drawing.Color]::FromArgb(240, 240, 240)

# Assemble right panel
$rightPanel = New-Object System.Windows.Forms.Panel
$rightPanel.Dock = "Fill"
$rightPanel.AutoScroll = $true
$rightPanel.Controls.Add($skipButton)
$rightPanel.Controls.Add($saveButton)
$rightPanel.Controls.Add($filenameComboBox)
$rightPanel.Controls.Add($filenameLabel)
$rightPanel.Controls.Add($categoryComboBox)
$rightPanel.Controls.Add($categoryLabel)
$rightPanel.Controls.Add($infoLabel)
$rightPanel.Controls.Add($previewPictureBox)

# Add panels to split container
$splitContainer.Panel1.Controls.Add($leftPanel)
$splitContainer.Panel2.Controls.Add($rightPanel)

# Add everything to form
$form.Controls.Add($splitContainer)
$form.Controls.Add($statusLabel)

# Event: Image selected
$imageListBox.Add_SelectedIndexChanged({
    if ($imageListBox.SelectedIndex -ge 0) {
        $selectedImage = $images[$imageListBox.SelectedIndex]
        
        # Load image preview
        try {
            $img = [System.Drawing.Image]::FromFile($selectedImage.FullName)
            $previewPictureBox.Image = $img
            
            # Show image info
            $imgWidth = $img.Width
            $imgHeight = $img.Height
            $imgSize = [math]::Round($selectedImage.Length / 1MB, 2)
            
            $infoLabel.Text = "Bilde $($imageListBox.SelectedIndex + 1) av $($images.Count)`n" +
                             "Storrelse: $imgWidth x $imgHeight px`n" +
                             "Filstorrelse: $imgSize MB"
        }
        catch {
            $infoLabel.Text = "Kunne ikke laste bilde: $_"
        }
        
        $saveButton.Enabled = $false
    }
})

# Event: Category selected
$categoryComboBox.Add_SelectedIndexChanged({
    if ($categoryComboBox.SelectedItem) {
        $category = $categoryComboBox.SelectedItem.ToString()
        $filenameComboBox.Items.Clear()
        
        # Add suggested filenames
        foreach ($name in $suggestedNames[$category]) {
            $filenameComboBox.Items.Add($name) | Out-Null
        }
        
        # Add custom option
        $filenameComboBox.Items.Add("Skriv inn eget navn...") | Out-Null
        
        if ($filenameComboBox.Items.Count -gt 0) {
            $filenameComboBox.SelectedIndex = 0
        }
    }
})

# Event: Filename selected
$filenameComboBox.Add_SelectedIndexChanged({
    if ($filenameComboBox.SelectedItem -and $categoryComboBox.SelectedItem) {
        $saveButton.Enabled = $true
    }
})

# Event: Save button clicked
$saveButton.Add_Click({
    if ($imageListBox.SelectedIndex -lt 0) { return }
    
    $selectedImage = $images[$imageListBox.SelectedIndex]
    $category = $categoryComboBox.SelectedItem.ToString()
    $targetFolder = $targetFolders[$category]
    $filename = $filenameComboBox.SelectedItem.ToString()
    
    # Handle custom filename
    if ($filename -eq "Skriv inn eget navn...") {
        $customName = [Microsoft.VisualBasic.Interaction]::InputBox(
            "Skriv inn filnavnet (uten .jpg):", 
            "Egendefinert filnavn",
            "mitt-bilde"
        )
        
        if ([string]::IsNullOrWhiteSpace($customName)) { return }
        
        $filename = "$customName.jpg"
    }
    
    # Convert PNG to JPG and move
    $targetPath = Join-Path $targetFolder $filename
    
    try {
        # Load PNG
        $img = [System.Drawing.Image]::FromFile($selectedImage.FullName)
        
        # Save as JPG
        $jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | 
                       Where-Object { $_.MimeType -eq 'image/jpeg' }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
            [System.Drawing.Imaging.Encoder]::Quality, 90L
        )
        
        $img.Save($targetPath, $jpegEncoder, $encoderParams)
        $img.Dispose()
        
        # IMPORTANT: Release the preview image first
        if ($previewPictureBox.Image) {
            $previewPictureBox.Image.Dispose()
            $previewPictureBox.Image = $null
        }
        
        # Small delay to ensure file handle is released
        Start-Sleep -Milliseconds 100
        
        # Delete original PNG
        Remove-Item $selectedImage.FullName -Force
        
        # Remove from list
        $currentIndex = $imageListBox.SelectedIndex
        $imageListBox.Items.RemoveAt($currentIndex)
        $images = $images | Where-Object { $_.FullName -ne $selectedImage.FullName }
        
        $statusLabel.Text = "Flyttet til: $category -> $filename"
        $statusLabel.BackColor = [System.Drawing.Color]::FromArgb(200, 255, 200)
        
        # Clear preview
        $previewPictureBox.Image = $null
        $infoLabel.Text = "Velg neste bilde fra listen"
        $saveButton.Enabled = $false
        
        # Select next image
        if ($imageListBox.Items.Count -gt 0) {
            $nextIndex = [Math]::Min($currentIndex, $imageListBox.Items.Count - 1)
            $imageListBox.SelectedIndex = $nextIndex
        }
        else {
            [System.Windows.Forms.MessageBox]::Show(
                "Alle bilder er organisert!`n`nNeste steg: Kjoer 'npm run dev' for a se bildene pa nettsiden.", 
                "Ferdig!", 
                [System.Windows.Forms.MessageBoxButtons]::OK, 
                [System.Windows.Forms.MessageBoxIcon]::Information
            )
            $form.Close()
        }
    }
    catch {
        [System.Windows.Forms.MessageBox]::Show(
            "Feil ved flytting: $_", 
            "Feil", 
            [System.Windows.Forms.MessageBoxButtons]::OK, 
            [System.Windows.Forms.MessageBoxIcon]::Error
        )
    }
})

# Event: Skip button clicked
$skipButton.Add_Click({
    if ($imageListBox.SelectedIndex -lt 0) { return }
    
    $currentIndex = $imageListBox.SelectedIndex
    $nextIndex = ($currentIndex + 1) % $imageListBox.Items.Count
    $imageListBox.SelectedIndex = $nextIndex
    
    $statusLabel.Text = "Hoppet over bilde"
    $statusLabel.BackColor = [System.Drawing.Color]::FromArgb(255, 250, 200)
})

# Show form
Add-Type -AssemblyName Microsoft.VisualBasic
$form.Add_Shown({ $form.Activate() })
[void]$form.ShowDialog()

Write-Host ""
Write-Host "Bildeorganisering fullfort!" -ForegroundColor Green
Write-Host ""
Write-Host "Neste steg:" -ForegroundColor Cyan
Write-Host "1. Kjor 'npm run dev' for a starte dev-serveren" -ForegroundColor White
Write-Host "2. Apne http://localhost:3001 i nettleseren" -ForegroundColor White
Write-Host "3. Bildene vil automatisk vises pa riktige sider!" -ForegroundColor White
