import { LightningElement, wire,api } from 'lwc';
import {registerListener,unregisterAllListeners,fireLWCDone} from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class Lwcflowbridge extends LightningElement {

    @wire(CurrentPageReference) pageRef;
    @api inpData;

    @api state;
    @api containerCmpId;

   
    initFlowBridge(){
        registerListener("click",this.handleClickParent,this);
    }

    async handleNavigation(){
        // This will be overridden in the child component
        return "";
    }

    async handleClickParent(metadata){
        try{
            let retData = await this.handleNavigation(metadata);
            if(!retData || retData == null)
                retData = "";
            unregisterAllListeners(this); // unregister all listeners before leaving this screen
            fireLWCDone(this,retData,metadata,this.state);
        }catch(err){
            // We don't unregister listeners here, since we have errors, we won't navigate away
            metadata.errors= err.message;
            fireLWCDone(this,"",metadata,this.state);
        }
        
    }
}