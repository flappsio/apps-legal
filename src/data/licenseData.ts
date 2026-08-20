import { LegalDocument } from "./crosshairLegalData";

export const MIT_LICENSE_DATA: LegalDocument = {
  id: "mit-license",
  title: "MIT Lisansı (Open Source License)",
  subtitle: "flappsio Açık Kaynak Lisans Bildirimi",
  lastUpdated: "2026",
  publisher: "flappsio",
  contactEmail: "info@flappsio.com",
  summary:
    "Bu yazılım MIT Lisansı kapsamında kullanıma sunulmuştur. Yazılımı kullanma, kopyalama, değiştirme, birleştirme, yayınlama ve dağıtma hakları ile koşul ve sorumluluk sınırları aşağıda belirtilmiştir.",
  metaDescription:
    "flappsio açık kaynak projeleri için MIT Lisansı metni, izinler, koşullar ve garanti reddi.",
  sections: [
    {
      id: "lisans-ozeti",
      number: "1",
      title: "Lisans Özeti ve İzinler",
      shortTitle: "İzinler & Haklar",
      callout: {
        type: "success",
        title: "Ticari ve Bireysel Kullanıma Uygun",
        text: "MIT Lisansı, yazılımı hem ticari projelerde hem de açık kaynak/bireysel çalışmalarda dilediğiniz gibi kullanmanıza, değiştirmenize ve dağıtmanıza izin veren son derece esnek ve özgür bir lisanstır.",
      },
      bullets: [
        "Ticari Kullanım: Yazılımı ticari ürün ve servislerinizde serbestçe kullanabilirsiniz.",
        "Değiştirme ve Geliştirme: Kaynak kodunu dilediğiniz gibi değiştirebilir, uyarlayabilir veya genişletebilirsiniz.",
        "Dağıtım: Orijinal veya değiştirilmiş sürümleri özgürce dağıtabilirsiniz.",
        "Alt Lisanslama: Yazılımı içeren projeleri farklı lisanslar altında sunabilirsiniz.",
        "Özel Kullanım: Kurum içi veya kişisel projelerinizde kısıtlama olmadan kullanabilirsiniz.",
      ],
    },
    {
      id: "kosullar-ve-zorunluluklar",
      number: "2",
      title: "Koşullar ve Yükümlülükler",
      shortTitle: "Koşullar",
      content:
        "MIT Lisansı son derece sade bir yükümlülük şartı getirir:",
      bullets: [
        "Telif Hakkı ve Lisans Bildirimi: Yazılımın tüm kopyalarında veya önemli bölümlerinde orijinal telif hakkı bildirimi (Copyright notice) ve bu izin metni korunmalıdır.",
      ],
    },
    {
      id: "garanti-reddi",
      number: "3",
      title: "Garanti Reddi ve Sorumluluk Sınırı (Disclaimer)",
      shortTitle: "Garanti Reddi",
      callout: {
        type: "warning",
        title: "Olduğu Gibi (AS IS) Sunulur",
        text: "Yazılım hiçbir garanti olmaksızın 'OLDUĞU GİBİ' sunulmaktadır. Yazarlar veya telif hakkı sahipleri, yazılımın kullanımından doğabilecek herhangi bir hasar veya sorumluluktan sorumlu tutulamaz.",
      },
    },
    {
      id: "orijinal-metin",
      number: "4",
      title: "Orijinal MIT Lisans Metni (Official English Text)",
      shortTitle: "Orijinal Metin",
      content: `MIT License

Copyright (c) 2026 flappsio

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
    },
  ],
};
