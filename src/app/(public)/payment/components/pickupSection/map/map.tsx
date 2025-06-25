
import { memo, useMemo } from "react";

function Map() {
    return (
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d460.5698570380932!2d-44.93869440918251!3d-22.558192271167208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9df6c43ceaef5d%3A0x35dd57423878f4dd!2sR.%20Eroni%20do%20Santos%20Goulart%2C%2024%20-%20Jardim%20Paraiso%2C%20Cruzeiro%20-%20SP%2C%2012721-295!5e0!3m2!1spt-BR!2sbr!4v1750185878426!5m2!1spt-BR!2sbr" width="100%" height="150" style={{ border: 0, borderRadius: '8px' }} loading="lazy"></iframe>
    );
}

const StoreMap = memo(Map);

export default function PickupMap() {
    return (
        <div className="overflow-hidden rounded-lg">
            <StoreMap />
        </div>
    )
}


