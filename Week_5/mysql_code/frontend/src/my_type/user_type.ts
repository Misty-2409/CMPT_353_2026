/* Type definition for User objects 
Used across components and services */ 

export type User = 
    { 
        id: number; name: string;
     }; 
/* 
No export → type stays on your single file 
export → tpes are shared with the class 
import → someone else uses your types
 */
