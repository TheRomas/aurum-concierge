const sharp = require('sharp');
const path = require('path');

async function processAllImages() {
    const dir = __dirname;
    
    // 1. Slide 02 - Ponte Estaiada Skyline (Pure bridge and skyline)
    const slide02 = path.join(dir, 'Aurum_Concierge_Slide_02_CORTE_CORRETO.jpg');
    const meta02 = await sharp(slide02).metadata();
    const left02 = Math.floor(meta02.width * 0.63);
    const width02 = meta02.width - left02;
    const height02 = Math.floor(meta02.height * 0.82);
    await sharp(slide02)
        .extract({ left: left02, top: 0, width: width02, height: height02 })
        .resize({ width: 1600, height: 1200, fit: 'cover' })
        .sharpen({ sigma: 1.4, m1: 1.8, m2: 0.8 })
        .jpeg({ quality: 98 })
        .toFile(path.join(dir, 'foto_quem_somos_skyline.jpg'));

    // 2. Slide 03 - Chauffeur opening luxury car door
    const slide03 = path.join(dir, 'Aurum_Concierge_Slide_03_CORTE_CORRETO.jpg');
    const meta03 = await sharp(slide03).metadata();
    const left03 = Math.floor(meta03.width * 0.58);
    const width03 = meta03.width - left03;
    await sharp(slide03)
        .extract({ left: left03, top: 0, width: width03, height: meta03.height })
        .resize({ width: 1600, height: 1200, fit: 'cover' })
        .sharpen({ sigma: 1.4, m1: 1.8, m2: 0.8 })
        .jpeg({ quality: 98 })
        .toFile(path.join(dir, 'foto_motorista_executivo.jpg'));

    // 3. Slide 04 - SUV Jeep Compass (Pure car without top/bottom/right text)
    const slide04 = path.join(dir, 'Aurum_Concierge_Slide_04_CORTE_CORRETO.jpg');
    const meta04 = await sharp(slide04).metadata();
    const top04 = Math.floor(meta04.height * 0.22);
    const height04 = Math.floor(meta04.height * 0.60);
    const width04 = Math.floor(meta04.width * 0.52);
    await sharp(slide04)
        .extract({ left: 0, top: top04, width: width04, height: height04 })
        .resize({ width: 1600, height: 1100, fit: 'cover' })
        .sharpen({ sigma: 1.4, m1: 1.8, m2: 0.8 })
        .jpeg({ quality: 98 })
        .toFile(path.join(dir, 'foto_frota_suv.jpg'));

    // 4. Slide 05 - Car Luxury Leather Interior & Skyline view
    const slide05 = path.join(dir, 'Aurum_Concierge_Slide_05_CORTE_CORRETO.jpg');
    const meta05 = await sharp(slide05).metadata();
    const left05 = Math.floor(meta05.width * 0.58);
    const width05 = meta05.width - left05;
    await sharp(slide05)
        .extract({ left: left05, top: 0, width: width05, height: meta05.height })
        .resize({ width: 1600, height: 1200, fit: 'cover' })
        .sharpen({ sigma: 1.4, m1: 1.8, m2: 0.8 })
        .jpeg({ quality: 98 })
        .toFile(path.join(dir, 'foto_interior_luxo.jpg'));

    // 5. Slide 07 - Apoio Estudantil (Student overlooking city)
    const slide07 = path.join(dir, 'Aurum_Concierge_Slide_07_CORTE_CORRETO.jpg');
    const meta07 = await sharp(slide07).metadata();
    const left07 = Math.floor(meta07.width * 0.58);
    const width07 = meta07.width - left07;
    await sharp(slide07)
        .extract({ left: left07, top: 0, width: width07, height: meta07.height })
        .resize({ width: 1600, height: 1200, fit: 'cover' })
        .sharpen({ sigma: 1.4, m1: 1.8, m2: 0.8 })
        .jpeg({ quality: 98 })
        .toFile(path.join(dir, 'foto_apoio_estudantil.jpg'));

    // 6. Slide 11 - Bridge Skyline with cars
    const slide11 = path.join(dir, 'Aurum_Concierge_Slide_11_CORTE_CORRETO.jpg');
    const meta11 = await sharp(slide11).metadata();
    const width11 = Math.floor(meta11.width * 0.38);
    await sharp(slide11)
        .extract({ left: 0, top: 0, width: width11, height: meta11.height })
        .resize({ width: 1600, height: 1200, fit: 'cover' })
        .sharpen({ sigma: 1.4, m1: 1.8, m2: 0.8 })
        .jpeg({ quality: 98 })
        .toFile(path.join(dir, 'foto_compromisso_ponte.jpg'));

    console.log('All 6 images successfully cleaned and rendered with high-res realism!');
}

processAllImages().catch(console.error);
