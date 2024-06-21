import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;

public class Solution {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine().trim(); 
        scanner.close();
        
        String[] tokens = input.split("\\s+");
        if (tokens.length == 0) {
            System.out.println("False"); 
            return;
        }
        
        int[] arr = new int[tokens.length];
        for (int i = 0; i < tokens.length; i++) {
            try {
                arr[i] = Integer.parseInt(tokens[i]);
            } catch (NumberFormatException e) {
                System.err.println("Invalid input: " + tokens[i]);
                return;
            }
        }
        
    
        boolean result = check(arr);
        System.out.println(result);
    }

    public static boolean check(int[] arr) {
        Set<Integer> seen = new HashSet<>();
        for (int num : arr) {
            if (seen.contains(num * 2) || (num % 2 == 0 && seen.contains(num / 2))) {
                return true;
            }
            seen.add(num);
        }
        return false;
    }
}
