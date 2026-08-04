const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: tenants, error: tErr } = await supabase.from('tenants').select('*');
  console.log('Tenants:', tenants, tErr);

  const { data: posts, error: pErr } = await supabase.from('posts').select('*');
  console.log('Posts:', posts?.length, pErr);
}

run();
