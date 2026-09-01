const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updatePseudonym() {
  console.log("=== ACTUALIZANDO AL SEUDÓNIMO 'Lucas Lucatero de Diego' ===");

  const slug = "anatomia-del-poder-salamanca-mercado-tomasa-estevez-jaime-ayala";

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    console.error("Post no encontrado:", error);
    process.exit(1);
  }

  const updatedExcerpt = post.excerpt.replace(/Jaime Ayala/g, "Lucas Lucatero de Diego");
  const updatedContent = post.content.replace(/Jaime Ayala/g, "Lucas Lucatero de Diego");

  const { data: updated, error: uErr } = await supabase
    .from('posts')
    .update({
      author_name: "Lucas Lucatero de Diego",
      author_avatar: "/images/authors/lucas_lucatero.jpg",
      excerpt: updatedExcerpt,
      content: updatedContent
    })
    .eq('id', post.id)
    .select();

  if (uErr) {
    console.error("Error al actualizar:", uErr);
    process.exit(1);
  }

  console.log("✅ Post actualizado con el seudónimo:", updated[0].author_name);
}

updatePseudonym();
