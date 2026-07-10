import { Request, Response} from 'express';
import { STATUS_CODE } from '../../Constants';

export const farmerLandingController = async (req: Request, res: Response) => {
    try {
        res.status(STATUS_CODE.ACCEPTED).json({
            message: "Welcome to farmer panel",
            user: res.locals.user,
        })
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: "Error while landing",
            error: error,
        })
    }
}