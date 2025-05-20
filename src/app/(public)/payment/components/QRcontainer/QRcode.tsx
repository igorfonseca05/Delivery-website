


export default function QRcode({ handlePayment }: { handlePayment: () => void }) {

    const payloadPix = '00020126360014BR.GOV.BCB.PIX0114+5599999999995204000053039865405100.005802BR5920Nome Do Recebedor6009Sao Paulo62070503***6304ABCD';

    const qrCodeURL = `https://quickchart.io/qr?text=${encodeURIComponent(payloadPix)}&size=250`;

    return (
        <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
            <span className="text-gray-500">
                <img src={qrCodeURL} alt="" className='rounded-lg' onClick={handlePayment} />
            </span>
        </div>
    );
};