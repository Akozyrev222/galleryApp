import {z} from "zod";
import schema from '../photo.schema'
import {AppKoaContext, AppRouter} from "../../../types";
import {validateMiddleware} from "../../../middlewares";
import {analyticsService, emailService} from "../../../services";
import {Photo} from "../photo.types";
import photoService from "../photo.service";


interface ValidatedData extends z.infer<typeof schema> {
    photo: Photo;
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
    console.log(ctx.validatedData)
    const {
        _id,
        createdOn,
        updatedOn,
        lastRequest,
        deletedOn,
        userId,
        title,
        firebaseUrl,
    } = ctx.validatedData;


    const photo = await photoService.insertOne({
        _id,
        createdOn,
        updatedOn,
        lastRequest,
        deletedOn,
        userId,
        title,
        firebaseUrl,
    });

    analyticsService.track('New photo created', {
        userId,
        title,
        firebaseUrl,
    });

    ctx.body = {};
}


export default (router: AppRouter) => {
    router.post('/upload', handler);
};
