//Adding a comment to test action on PR. Just changing this now.
public class MyNewerClass{

    public MyNewerClass(){
        for(Integer i=0;i<10;i++){
            Account a = [Select Id from Account limit 1]; // soql in a for loop to fail pmd check
        }
    }
}