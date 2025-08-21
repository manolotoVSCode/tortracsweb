-- Just insert the missing default content
INSERT INTO public.editable_content (content_key, content_value, content_type, section) VALUES
('hero.title', 'Soluciones de transporte terrestre en México', 'text', 'hero'),
('hero.subtitle', 'Más de 10 años ofreciendo servicios de logística flexibles y confiables', 'text', 'hero'),
('about.history.content', 'TORTRACS nació en 2014 con dos camiones y una visión clara: construir una empresa de transporte seria, eficiente y con futuro. Su fundador, Gilberto Guzmán, asumió el reto desde el terreno, moviendo arena y grava en los primeros trayectos.

Hoy, más de una década después, operamos con una flota de más de 80 unidades, brindando soluciones logísticas a clientes AAA, y respondiendo con puntualidad, seguridad y control en cada entrega.

Nuestro crecimiento ha sido posible gracias a decisiones firmes y una cultura de trabajo enfocada en el largo plazo. El órgano de gobierno actual cuenta con socios estratégicos de alto valor, con un respaldo financiero sólido que nos permite planear con visión, invertir con responsabilidad y operar sin atajos.

Seguimos creciendo, pero sin olvidar de dónde venimos. En TORTRACS, hacemos que las cosas lleguen. Y lleguen bien.', 'html', 'about'),
('about.mission.content', 'Empresa de transporte enfocada en generar confianza y resultados sostenibles. Operamos con altos estándares de seguridad, cuidamos el impacto de cada kilómetro recorrido y apostamos por relaciones duraderas con nuestros clientes, nuestra gente y el entorno. Convertimos la logística en una experiencia eficiente, humana y preparada para los retos del camino.', 'html', 'about'),
('about.vision.content', 'Construir una operación de transporte sólida, eficiente y con propósito, capaz de mantenerse firme ante los retos del entorno, generar valor real para clientes y comunidades, y dejar huella por la forma en que hacemos las cosas, no por el tamaño.', 'html', 'about'),
('services.subtitle', 'En TORTRACS ofrecemos soluciones de transporte flexibles, seguras y con control total sobre la operación. Nos adaptamos a las necesidades específicas de cada cliente, sin comprometer la calidad ni la puntualidad.', 'text', 'services'),
('value.subtitle', 'Por qué elegir TORTRACS', 'text', 'value'),
('contact.subtitle', '', 'text', 'contact')
ON CONFLICT (content_key) DO NOTHING;