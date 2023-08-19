const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const taskData = require('../model/taskData');

//to get task data for tasks page

router.get('/getldata', auth, async (req, res) => {
    const data = await taskData.find();
    try {
        jwt.verify(req.params.token, "ict",
            (error, decoded) => {
                if (decoded && decoded.email) {
                    res.json({ "message": "success", data });
                } else {
                    res.json({ message: "Unauthorised User" });
                }
            })

    } catch (error) {
        res.json({ message: "Not successful" });
    }
})

//to post task data from tasks form
router.post('/postldata', auth, (req, res) => {
    try {
        const item = req.body;
        const newdata = new taskData(item);
        jwt.verify(req.body.token, "ict",
            (error, decoded) => {
                if (decoded && decoded.email) {
                    newdata.save();
                    res.json({ message: "Posted successfully" });

                } else {
                    res.json({ message: "Unauthorised User" })
                }
            })

    } catch (error) {
        res.json({ message: "Post not successful" });
    }
})

//to update task data
router.put('/putldata/:id', auth, async (req, res) => {
    try {
        const item = req.body;
        const index = req.params.id;
        const updatedData = taskData.findByIdAndUpdate(index, item).exec();
        res.json({ message: "Updated successfully" });
    } catch (error) {
        res.json({ message: "Updation not successful" });
    }
})

//to delete task data
router.delete('/delldata/:id', (req, res) => {

    try {
        const ind = req.params.id;

        taskData.findByIdAndDelete(ind).exec();
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.json({ message: 'Deletion not successful' });
    }
})

module.exports = router;