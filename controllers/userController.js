const  db = require('../config/db');
//Get all users List
const getUsers = async (req, res) =>{
try{
    const data = await db.query('SELECT * FROM Users')
    if(!data){
        return res.status(404).send({
            success:false,
            message:'No Records found'
        })
    }
    res.status(200).send({
        success: true,
        message: "All Users Record",
        user_count: data[0].length,
        data: data[0],
    })

} catch (error){
    console.log(error)
    res.status(500).send({
        success: false,
        message:'Error in get Users',
        error
    })
}
};

//get user by Id
const getUser = async (req, res) =>{
    try{
        const user_id = req.params.id
        if(!user_id){
            return res.send(404).send({
                success:false,
                message: 'Invalid student ID'
            })
        }

        const data = await db.query(`SELECT * FROM Users WHERE user_id=?`, [user_id])
        if(!data){
            return  res.status(404).send({
                success: false,
                message: "No record found"
            })
        }

        res.status(200).send({
            success: true,
            user_details: data[0],
        })

    } catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get User',
            error
        })
    }

}

//create user account

const createUser = async (req, res) => {
try{
    const {user_firstname,user_lastname,user_email_address,user_company_id,user_driver_license,user_contact,user_country_code,user_account_status,user_password,password_status,user_create_date,user_update_date} = req.body
    if(!user_firstname || !user_lastname || !user_email_address || !user_company_id || !user_driver_license || !user_contact || !user_country_code || !user_account_status || !user_password
    || !password_status || !user_create_date || !user_update_date){
        return res.status(500).send({
            success: false,
            message: 'Please Provide all fields',
        })
    }

    const data = await  db.query(`INSERT INTO Users(user_firstname,user_lastname,user_email_address,user_company_id,user_driver_license,user_contact,user_country_code,user_account_status,user_password,password_status,user_create_date,user_update_date)
VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [user_firstname,user_lastname,user_email_address,user_company_id,user_driver_license,user_contact,user_country_code,user_account_status,user_password,password_status,user_create_date,user_update_date])
    if(!data){
        return res.status(404).send({
            success:false,
            message:"Error In Insert Query"
        });
    }
    res.status(201).send({
        success:true,
        message: 'New student Record Created',
    })

}catch (error){
    console.log(error);
    res.status(500).send({
        success: false,
        message: 'Error adding User',
        error
    })
}
}

//update User details

const updateUser = async (req, res)=>{
    try{
       const  user_id = req.params.id;
       if(!user_id){
           return res.status(404).send({
               success: false,
               message: 'Invalid User  Id',
           })
       }
       const {user_firstname,user_lastname,user_email_address,user_company_id,user_driver_license,user_contact,user_country_code,user_account_status,user_password,password_status,user_create_date,user_update_date} = req.body
        const data = await db.query(`UPDATE Users SET user_firstname=?,user_lastname=?,user_email_address=?,user_company_id=?,user_driver_license=?,user_contact=?,
user_country_code=?,user_account_status=?,user_password=?,password_status=?,user_create_date=?,user_update_date=? WHERE user_id=?`, [user_firstname,user_lastname,user_email_address,user_company_id,user_driver_license,user_contact,user_country_code,user_account_status,user_password,password_status,user_create_date,user_update_date, user_id])
        if(!data){
            return  res.status(500).send({
                success: false,
                message: 'Error in Updating User Data'
            })
        }
        res.status(200).send({
            success:true,
            message:"student Details Updated",
        })

    }catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Updating user details',
            error
        })
    }

}

//Delete user Account

const deleteUser = async (req, res) =>{
    try{
        const user_id = req.params.id
        if(!user_id){
            return res.status(404).send({
                success:false,
                message:"Invalid user Id"
            })
        }
       await  db.query(`DELETE FROM Users WHERE user_id= ?`, [user_id]);
        res.status(200).send({
            success:true,
            message: 'User deleted Successfully',
        })


    }catch (error) {
       console.log(error)
       res.status(500).send({
           success:false,
           message: "Error in deleting user",
           error
       })
    }

}

module.exports = {getUsers, getUser, createUser, updateUser, deleteUser}
