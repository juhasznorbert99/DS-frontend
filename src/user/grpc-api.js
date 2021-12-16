import {HOST} from '../commons/hosts';
import RestApiClient from "../commons/api/rest-client";

const endpoint = {
    rpc: '/rpc',
    device: '/device'
};

function getDevices(callback){
    let request = new Request(HOST.backend_api + endpoint.rpc, {
        method: 'POST',
        headers: {
            },
        body: JSON.stringify({"id":"1", "jsonrpc":"2.0", "method": "getDevices", "params": {}})
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getSensorDatas(id, days, callback){
    let request = new Request(HOST.backend_api + endpoint.rpc, {
        method: 'POST',
        headers: {},
        body: JSON.stringify({"id":"1", "jsonrpc":"2.0", "method": "getSensorData", "params": {"id": id, "days" : days}})
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function getDevice(id, callback){
    let request = new Request(HOST.backend_api + endpoint.device + "/"+ id,{
        method: 'GET',
    });
    RestApiClient.performRequest(request,callback);
}
export {
    getDevices,
    getSensorDatas,
    getDevice
};