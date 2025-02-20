"use server"

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {z} from "zod"

// for validating articles
const createArticleSchema = z.object({
    title: z.string().min(3).max(100),
    category: z.string().min(3).max(50),
    content: z.string().min(10),
});

type createArticlesFormState = {
    errors: {
        title?: string[],
        category?: string[],
        featuredImage?: string[],
        content?: string[],
        formErrors?: string[],
    },

}

export const createArticle = async (prevState:createArticlesFormState, formData : FormData) : Promise<createArticlesFormState> => {

    const result = createArticleSchema.safeParse({
        title: formData.get('title'),
        category: formData.get('category'),
        content: formData.get('content'),
    });

    if(!result.success){
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    // check for auth:
    const {userId} = await auth();
    if(!userId){
        return {
            errors: {
                formErrors: ['You need to login'],
            }
        }
    }

    // now start creating an article:


    const imageFile = formData.get('featuredImage') as File | null;

    // return error for no featured error:
    if(!imageFile || imageFile.name==='undefined'){
        return{
            errors: {
                featuredImage: ['Image file is required'],
            }
        }
    }

    const 

    // redirect finally to dashboard:
    redirect('/dashboard');
}