-- Insert missing content for values and metrics sections
INSERT INTO public.editable_content (content_key, content_value, content_type, section) VALUES
('about.values.title', 'Nuestros Valores', 'text', 'about'),
('about.values.safety', 'Seguridad: Cada trayecto inicia con una prioridad: que personas, carga y unidades lleguen sanas y completas. La prevención es parte de nuestra operación diaria.', 'textarea', 'about'),
('about.values.responsibility', 'Responsabilidad: Somos conscientes del entorno en el que operamos. Cuidamos el medio ambiente y actuamos con respeto hacia las comunidades donde tenemos presencia.', 'textarea', 'about'),
('about.values.closeness', 'Cercanía: Escuchamos, respondemos y acompañamos. Construimos relaciones de confianza, con presencia directa y comunicación abierta en todo momento.', 'textarea', 'about'),
('about.values.transparency', 'Transparencia: Monitoreamos cada ruta en tiempo real y compartimos decisiones con nuestros clientes. La visibilidad es parte de nuestro servicio, no un extra.', 'textarea', 'about'),
('about.values.resilience', 'Resiliencia: Adaptarnos es parte del camino. Respondemos con rapidez, firmeza y sin perder calidad, incluso ante entornos cambiantes o imprevistos.', 'textarea', 'about'),
('about.values.commitment', 'Compromiso: Lo que hacemos, lo hacemos bien. Nuestra meta es la excelencia operativa y el cumplimiento constante, sin atajos ni excusas.', 'textarea', 'about'),
('about.metrics.title', 'Métricas Clave', 'text', 'about')
ON CONFLICT (content_key) DO NOTHING;