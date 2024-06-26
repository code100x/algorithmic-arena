
import java.io.*;
import java.util.*;

public class Main {
    
    ##USER_CODE_HERE##

    public static void main(String[] args) {
        String filePath = "/dev/problems/two-sum/tests/inputs/##INPUT_FILE_INDEX##.txt"; 
        List<String> lines = readLinesFromFile(filePath);
        int num1 = Integer.parseInt(lines.get(0).trim());
  int num2 = Integer.parseInt(lines.get(1).trim());
        int result = sum(num1, num2);
        System.out.println(result);
    }
    public static List<String> readLinesFromFile(String filePath) {
        List<String> lines = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                lines.add(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return lines;
    }
}