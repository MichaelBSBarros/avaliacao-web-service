import staticData from './data.mjs';

export default class Params {
    static checkerId(req) {
        let _id = (req.params._id).replace(/[^0-9a-zA-Z-]/g, "") || false
        let index = staticData.findIndex(v => v._id == _id)

        console.log(_id)
        console.log(index)

        let id = {
            status: 0,
            msg: "",
            index: -1
        }

        if (!_id) {
            id.status = 400
            id.msg = 'invalidId'
            return id
        } else if (index === -1) {
            id.status = 404
            id.msg = 'notFoundId'
            return id
        }
        return id
    }
}