# Compile the Java solution
javac solutions/Solution.java
if ($LASTEXITCODE -ne 0) {
    Write-Output "Compilation failed."
    exit 1
}

# Create the output directory if it doesn't exist
$outputDir = "tests/output"
if (-not (Test-Path -Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir
}

# Loop through all the input files
$inputFiles = Get-ChildItem -Path "tests/input" -Filter *.txt
foreach ($inputFile in $inputFiles) {
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($inputFile.FullName)
    $outputFile = "$outputDir/$baseName.txt"

    # Use a temporary file to store the input content
    $tempInputFile = [System.IO.Path]::GetTempFileName()
    Get-Content $inputFile.FullName -Raw | Set-Content $tempInputFile

    # Run the Java program and redirect input/output using temporary files
    Start-Process -FilePath "java" -ArgumentList "-cp solutions Solution" -RedirectStandardInput $tempInputFile -RedirectStandardOutput $outputFile -NoNewWindow -Wait

    # Check for errors
    if ($LASTEXITCODE -ne 0) {
        Write-Output "Error processing file: $($inputFile.FullName)"
    }

    # Remove the temporary input file
    Remove-Item $tempInputFile
}

Write-Output "All tests have been processed."
