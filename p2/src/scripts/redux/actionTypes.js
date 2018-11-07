export default {
    create:(type,data)=>{
        return {"type":type,"data":data};
    },
    'ADD_LIST': Symbol('ADD_LIST'),
    'DELETE_LIST': Symbol('DELETE_LIST')
}