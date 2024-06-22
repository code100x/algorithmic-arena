import java.util.Scanner;
import java.util.HashMap;

public class Solution {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine().trim(); // trim to remove leading/trailing whitespace
        scanner.close();
        
        // Split input by spaces and convert to array of integers
        String[] tokens = input.split("\\s+");
        if (tokens.length == 0) {
            System.out.println("False"); // No elements to compare
            return;
        }
        
        int[] arr = new int[tokens.length];
        for (int i = 0; i < tokens.length; i++) {
            try {
                arr[i] = Integer.parseInt(tokens[i]);
            } catch (NumberFormatException e) {
                System.err.println("Invalid input: " + tokens[i]);
                System.exit(1); // Exit the program on invalid input
            }
        }
        
        // Call check function and print the result
        int result = totalBook(arr);
        System.out.println(result);
    }
    
    public static int totalBook(int[] arr) {
        int n = arr.length;
        int res = 0;
        HashMap<Integer, Integer> map = new HashMap<>();
        int i = 0;
        int j = 0;
        while (j < n) {
            map.put(arr[j], map.getOrDefault(arr[j], 0) + 1);
            while (map.size() > 2) {
                map.put(arr[i], map.get(arr[i]) - 1);
                if (map.get(arr[i]) == 0) {
                    map.remove(arr[i]);
                }
                i++;
            }
            res = Math.max(res, j - i + 1);
            j++;
        }
        return res;
    }
}
