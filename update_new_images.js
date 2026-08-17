const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const imageUpdates = [
  { slug: 'obra-pluvial-cachoches-agosto-2026', image_url: '/images/news_drainage_sma.jpg' },
  { slug: 'comision-congreso-blindaje-patrimonial-2026', image_url: '/images/news_patrimony_law.jpg' },
  { slug: 'exportaciones-agroindustriales-sma-2026', image_url: '/images/news_agri_exports.jpg' },
  { slug: 'programa-festival-musica-camara-2026', image_url: '/images/news_chamber_music.jpg' },
  { slug: 'san-miguel-distintivo-destino-sostenible-2026', image_url: '/images/news_sustainable_tourism.jpg' }
];

async function main() {
  console.log('Updating images for August 17 news articles...');
  for (const update of imageUpdates) {
    const { data, error } = await supabase
      .from('posts')
      .update({ image_url: update.image_url })
      .eq('slug', update.slug)
      .select();

    if (error) {
      console.error(`Error updating ${update.slug}:`, error);
    } else {
      console.log(`Updated image for ${update.slug}:`, update.image_url);
    }
  }
  console.log('Finished updating database images!');
}

main();
