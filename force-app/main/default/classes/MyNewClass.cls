//Adding a comment to test action on PR
public class MyNewClass{

    public MyNewClass(){
        for(Integer i=0;i<10;i++){
            Account a = [Select Id from Account limit 1]; // soql in a for loop to fail pmd check
        }
    }
}