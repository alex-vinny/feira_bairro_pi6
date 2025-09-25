export default function Footer() {
  const footerSections = [
    {
      title: "Ofertas",
      links: ["iPhones", "iPads", "MacBooks", "Acessórios"],
    },
    {
      title: "Suporte",
      links: [
        "Central de Ajuda",
        "Fale Conosco",
        "Informações de Envio",
        "Devoluções",
      ],
    },
    {
      title: "Empresa",
      links: [
        "Sobre Nós",
        "Carreiras",
        "Política de Privacidade",
        "Termos de Serviço",
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Univesp</h3>
            <p className="text-gray-400">
              O marketplace confiável para a comunidade.
            </p>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link) => (
                  <li key={link}>{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Univesp Market. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
