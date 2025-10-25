import supabase from "../utils/supabase"

export async function uploadImg(file: File | null) {
  if (!file) return null

  // const {
  //   data: { user },
  //   error: userError,
  // } = await supabase.auth.getUser()
  // if (userError || !user) {
  //   console.error("User wurde nicht gefunden")
  //   return null
  // }

  // Die RLS-Policy vergleicht mit auth.uid() — und das ist nicht user.id aus getUser(), sondern session.user.id
  // policies:
  // ((bucket_id = 'cupcake-img'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text))
  // (bucket_id = 'cupcake-img' AND position(auth.uid() || '/' IN name) = 1)

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
  if (sessionError || !sessionData?.session?.user?.id) {
    console.error("Session oder User-ID nicht gefunden")
    return null
  }
  const userId = sessionData.session.user.id

  // timestamp = immer unique; keine Dopplungen/Probleme mit Supabase
  const timestamp = Date.now()
  // Sonderzeichen ersetzen
  const safeName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`
  const filePath = `${userId}/${safeName}`

  // console.log("filePath", filePath)
  // console.log("userId", userId)
  // console.log("timestamp", timestamp)

  const { error: storageError } = await supabase.storage.from("cupcake-img").upload(filePath, file, {
    cacheControl: "3600",
    upsert: true,
    contentType: file.type,
  })

  if (storageError) {
    console.error("Fehler beim Hochladen:", storageError)
    return null
  }

  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from("cupcake-img")
    .createSignedUrl(filePath, 60 * 60 * 24 * 365 * 1000)

  if (signedUrlError) {
    console.error("Fehler beim Erstellen der Signed URL:", signedUrlError)
    return null
  }

  console.log("Bild erfolgreich hochgeladen:", signedUrlData.signedUrl)

  return signedUrlData.signedUrl
}
