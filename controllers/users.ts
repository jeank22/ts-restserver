import {Request, Response} from 'express';
import User from '../models/user';

export const getUsers = async(req: Request, res: Response) => {
    const users = await User.findAll();

    res.json({users})
}

export const getUser = async (req: Request, res: Response) => {
    const {id} = req.params
    const user = await User.findByPk(id);

    if (user){
        res.json(user);
    } else{
        res.status(404).json({
            msg: "User doesn't exist with id " + id
        });
    }

}

export const postUser = async(req: Request, res: Response) => {
    const {body} = req;
    try {
        const emailExist = await User.findOne({
            where: {
                email: body.email
            }
        });
        if(emailExist){
            return res.status(400).json({
                msg: 'Allready exist an user with this email ' + body.email
            })
        };
        const user = await User.create(body);
        // await user.save();
        res.json(user);

    } catch (error) {
        console.log(error);
        
        res.json({
            msg: 'Contact the administraror'
        })
    }

    
}

export const putUser = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {body} = req;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: "Doesn't exist an user with this id " + id
            });
        }

        await user.update(body);
        res.json(user);

    } catch (error) {
        console.log(error);
        
        res.json({
            msg: 'Contact the administraror'
        })
    }
}
export const deleteUser = async(req: Request, res: Response) => {
    const {id} = req.params;

    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: "Doesn't exist an user with this id " + id
        });
    }
    //Physical delete
    // await user.destroy();

    await user.update({state: false});
    res.json(user);

}