import PixCodeBox from "./components/copyButton/CopyButton";


export default function QRcode({ handlePayment }: { handlePayment: () => void }) {

    const payloadPix = '00020126360014BR.GOV.BCB.PIX0114+5599999999995204000053039865405100.005802BR5920Nome Do Recebedor6009Sao Paulo62070503***6304ABCD';

    const qrCodeURL = `https://quickchart.io/qr?text=${encodeURIComponent(payloadPix)}&size=250`;

    return (
        <div className="flex flex-col overflow-hidden">
            <p className="font-semibold mb-2 text-[clamp(1.2rem,1em,2rem)]">Leia QR Code abaixo para realizar o pagamento via Pix</p>
            <p className="font-light text">O pagamento será confirmado em poucos segundos após a leitura.</p>
            <div className=" rounded-lg p-6 flex items-center justify-center">
                <span className="">
                    <img src={qrCodeURL} alt="" width={"150px"} className='rounded-lg' onClick={handlePayment} />
                </span>
            </div>
        </div>
    );
};