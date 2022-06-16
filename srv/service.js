const cds = require('@sap/cds');
const { Status, Reporte, Evento } = cds.entities("CatalogService");
const crud = async (srv) => {

    srv.on('postData', async (req) => {
        console.log(req.data);
        const dev1 = "42A6AB"; // Casa 1
        const dev2 = "42A640"; // Casa 2
        const dev3 = "42923D"; // Principal

        const device = req.data.device;

        // 1 = 100%  | 25 = 0%
        var dist = -4.1667 * Number(req.data.dist) + 104.17;

        if(dist<0) dist = 0;
        if(dist>100) dist = 100;
        
        const caudal = Number(req.data.caudal);
        const rele = req.data.rele === '1.0';

        console.log("Device: " + device);

        var tipo = "Falta de suministro";
        var descripcion = "Se ha detectado una falta de suministro en el caudalímetro principal";
        console.log(device + " " + caudal);
        if(device == "42923D" && caudal === 0){
            console.log("Insert EVENTO");
            await INSERT.into(Evento).entries({
                tipo,
                descripcion
           });            

        }
        
        // Se obtiene último reporte
        const [lastReporte] = await Promise.all([ //lastReporte[0]
            SELECT
                .one
                .from(Reporte)
                .columns('dev1_dist', 'dev1_caudal', 'dev1_rele', 'dev2_dist', 'dev2_caudal', 'dev2_rele', 'dev3_dist', 'dev3_caudal', 'dev3_rele')
                .orderBy("CreatedAt desc"),
            INSERT.into(Status).entries({
                device,
                dist,
                caudal,
                rele
            })])

        console.log("lastReporte: " + JSON.stringify(lastReporte));

        // Se reemplaza según el dispositivo que esté llegando
        switch (device) {
            case dev1:
                lastReporte.dev1_dist = dist;
                lastReporte.dev1_caudal = caudal;
                lastReporte.dev1_rele = rele;
                break;
            case dev2:
                lastReporte.dev2_dist = dist;
                lastReporte.dev2_caudal = caudal;
                lastReporte.dev2_rele = rele;
                break;
            case dev3:
                lastReporte.dev3_dist = dist;
                lastReporte.dev3_caudal = caudal;
                lastReporte.dev3_rele = rele;
                break;
            default:
                break;
        }

        // Se inserta registro modificado
        await INSERT.into(Reporte).entries({
            dev1_dist: lastReporte.dev1_dist,
            dev1_caudal: lastReporte.dev1_caudal,
            dev1_rele: lastReporte.dev1_rele,
            dev2_dist: lastReporte.dev2_dist,
            dev2_caudal: lastReporte.dev2_caudal,
            dev2_rele: lastReporte.dev2_rele,
            dev3_dist: lastReporte.dev3_dist,
            dev3_caudal: lastReporte.dev3_caudal,
            dev3_rele: lastReporte.dev3_rele,
        });

    })

}

module.exports = crud;