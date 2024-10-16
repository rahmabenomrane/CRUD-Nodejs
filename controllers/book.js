import Book from "../models/Books.js"

export const fetchbook = async (req,res) => {
    const books =await Book.find();
    res.status(200).json({model:books ,message:"success fetch"});
};

export const postbook = async (req, res) =>{
    console.log("body", req.body);
    const book =new Book(req.body);
    await book.save();
    res.status(201).json({model:book ,message :"success post"})
};

export const getidbook = async (req,res)=>{
    console.log("id", req.params.id);
    const book = await Book.findOne({_id: req.params.id})
     res.status(200).json({model: book, message:"success get by id" })
};

export const upbook= async (req,res) =>{
    const book= await Book.findOneAndUpdate({_id:req.params.id}, req.body ,{
        new: true
    });
    res.status(200).json({model :book, message :"update done "})
}

export const delbook =async (req,res)=>{
    await Book.deleteOne({_id:req.params.id});
    res.status(200).json({message:"deleted"})
}