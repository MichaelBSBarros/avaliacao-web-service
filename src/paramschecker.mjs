import staticData from './data.mjs';
import messagestorage from './messagestorage.mjs';

export default class Params {
    static checkerId(req) {
        let _id = (req.params._id).replace(/[^a-zA-Z-]/g, "") || false
        let index = staticData.findIndex(v => v._id == _id)

        if (!_id) {
            res.status(442).json({
                erro: messagestorage.getMessage('invalidId')
            })
        }

        if (index === -1) {
            res.status(404).json({
                erro: messagestorage.getMessage('notFoundId')
            })
        }
    }
}