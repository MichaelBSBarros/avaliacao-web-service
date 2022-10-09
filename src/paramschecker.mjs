import staticData from './data.mjs';

export default class Params {
    static checkerId(req) {
        let _id = (req.params._id).replace(/[^a-zA-Z-]/g, "") || false
        let index = staticData.findIndex(v => v._id == _id)

        const id = {
            status: 0,
            msg: ""
        }

        if (!_id) {
            id.status = 442
            id.msg = 'invalidId'
        }

        if (index === -1) {
            id.status = 404
            id.msg = 'notFoundId'
        }

        return id.status > 0 ? id : false
    }
}