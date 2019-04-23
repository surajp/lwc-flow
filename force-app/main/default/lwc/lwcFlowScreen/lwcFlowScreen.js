import Lwcflowbridge from 'c/lwcflowbridge';
import {track} from 'lwc';

export default class LwcScreenOne extends Lwcflowbridge {


    @track name="Mr. X";

    handleChange(event){
        this.name = event.detail.value;
    }

    // Implement handleNavigation however you like. This method will get invoked when user clicks any of the flow navigation buttons
    async handleNavigation(metadata){

        if(this.name === "Error")
            throw new Error("Invalid name");
        //Save the current state if you'd like it to be restored when the user comes back to this screen
        this.saveState();

        if(metadata.action === "NEXT"){
            return "Next was clicked";
        }else if(metadata.action === "BACK"){
            return "Back was clicked";
        }else if(metadata.action === "FINISH"){
            return "Finish was clicked";
        }else if(metadata.action === "PAUSE"){
            return "Pause was clicked";
        }

        
        return "Invalid action";
    }

    // Save the state of this component so that it may be restored later, if needed.
    saveState(){
        this.state = this.name;
    }

    // Implement this method to restore the state of this component if the user comes back to this screen
    restoreState(){
        if(this.state && this.state.trim().length>0){
            this.name = this.state;
        }
    }


    connectedCallback(){
        // this is the only mandatory method to be called
        this.initFlowBridge();
        // restore state if you want to
        this.restoreState();
    }
}