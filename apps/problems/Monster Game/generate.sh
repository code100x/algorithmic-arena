g++ solutions/ans.cpp -o solutions/ans

# Create the output directory if it doesn't exist
mkdir -p tests/output

# Loop through all the input files
for input_file in tests/input/*.txt; do
    # Extract the filename without the extension
    base_name=$(basename -- "$input_file" .txt)

    # Run the compiled program with input and generate the output
    ./solutions/ans < "$input_file" > "tests/output/$base_name.txt"
    if [ $? -ne 0 ]; then
        echo "Error processing file: $input_file"
    fi
done

echo "All tests have been processed."
