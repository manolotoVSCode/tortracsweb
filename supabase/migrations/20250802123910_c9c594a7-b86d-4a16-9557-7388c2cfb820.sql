-- Create storage policies for cv-uploads bucket to allow anonymous uploads
DROP POLICY IF EXISTS "Allow public CV uploads" ON storage.objects;

-- Allow anonymous users to upload CVs to the cv-uploads bucket
CREATE POLICY "Allow public CV uploads" 
ON storage.objects 
FOR INSERT 
TO anon
WITH CHECK (bucket_id = 'cv-uploads');

-- Also allow authenticated users to upload CVs
CREATE POLICY "Allow authenticated CV uploads" 
ON storage.objects 
FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'cv-uploads');