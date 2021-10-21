const getDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioinput = document.getElementById('audioinput');
    const videoinput = document.getElementById('videoinput');
    const audiooutput = document.getElementById('audiooutput');
    const kindMapSelect = {
        audioinput,
        videoinput,
        audiooutput
    }
    devices.forEach(function (device) {
        const option = document.createElement('option');
        const element = kindMapSelect[device.kind];
        element.appendChild(option);
        option.text = device.label;
        option.value = device.deviceId;
        console.log(device.kind + ": " + device.label +
            " id = " + device.deviceId + " groundId = " + device.groupId);
    });
}
const getUserMedia = async (constraints, element) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        element.autoplay = true;
        element.playsInline = true;
        element.srcObject = stream;
    } catch (e) {
        console.log(e)
    }

}
const init = () => {
    const element = document.getElementById('video')
    const width = element.offsetWidth,
        height = element.offsetHeight;
    getUserMedia({
        // audio: true,
        video: {
            width,
            height
        }
    }, element);
    getDevices();

}
init();