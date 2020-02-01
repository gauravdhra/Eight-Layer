export interface Customer {
    question: string; // required field with minimum 5 characters
    inspired_by:string;
    question_insights:string;
    question_type:any;
    question_level:any;
    //question_options_array: Address[]; // user can have one or more addresses
}

export interface Address {
    name: string;  // required field
    answer:any;
    
}