/*
 * Interact District 3220 — Image Manifest
 * ----------------------------------------
 * One entry per original image found on https://www.interactdistrict3220.org
 *
 * Each entry has:
 *   id       -> the Wix media id (everything after /media/ and before /v1/...)
 *   name     -> friendly filename to save it as (extension taken from id)
 *   category -> folder/grouping for organisation
 *   page     -> where the image appears on the live site
 *   alt      -> alt text / description (if any)
 *
 * The ORIGINAL full-resolution file is always served from:
 *   https://static.wixstatic.com/media/<id>
 * (i.e. strip the "/v1/fill/...." transform suffix Wix adds for thumbnails).
 *
 * This file is shared by BOTH download-images.js (Node) and
 * download-images.html (browser), so it must stay plain ES5-ish.
 */

var IMAGE_MANIFEST = [
  // ---------- Branding / Logos ----------
  { id: "11062b_c18db2b1461b46f2ad31bae61009fee1f000.jpg", name: "logo-header.jpg",            category: "branding", page: "global (header)",  alt: "District header logo" },
  { id: "9a1ed2_cd3da27265b14c57adad346663254b87~mv2.png",  name: "logo-footer.png",            category: "branding", page: "global (footer)",  alt: "Interact" },
  { id: "4ed48c_2cc821e0a48a4aff8f8e31cc63c830ab~mv2.png",  name: "rotary-logo.png",            category: "branding", page: "home",             alt: "Rotary logo" },
  { id: "4ed48c_ef717c13bdc44affa0f0e0a6a48a1985~mv2.jpg",  name: "media-crew-header.jpg",      category: "branding", page: "media-crew",       alt: "Media Crew header" },
  { id: "9e0097_7bf0c6ca3b204fdb956d10cefba65958~mv2.png",  name: "media-crew-white-logo.png", category: "branding", page: "media-crew",       alt: "White Logo Media Crew" },
  { id: "e78279_84bc3ede10424ec2bb2cc64ae47002f6~mv2.png",  name: "newsletter-tqi-logo.png",   category: "branding", page: "newsletter",       alt: "This Quarter in Interact logo" },
  { id: "9e0097_41a954146f794c92b976b2c4ad86cce6~mv2.png",  name: "newsletter-footer.png",     category: "branding", page: "newsletter",       alt: "Newsletter footer image" },

  // ---------- Home: Five Avenues icons ----------
  { id: "9e0097_b1608b08e4ab469384985366455515c9~mv2.png", name: "avenue-community-service.png",        category: "avenues", page: "home", alt: "Community Service" },
  { id: "9e0097_f94396240af047499a41e46e8a0fd3c6~mv2.png", name: "avenue-international-understanding.png", category: "avenues", page: "home", alt: "International Understanding" },
  { id: "9e0097_5a605bff6587457dbd0ac6e893781311~mv2.png", name: "avenue-club-service.png",             category: "avenues", page: "home", alt: "Club Service" },
  { id: "9e0097_d5bab3967ec74f61bb701edd8fcf3b8e~mv2.png", name: "avenue-green-life.png",               category: "avenues", page: "home", alt: "Green Life" },
  { id: "9e0097_a8b7038763b24bac93ffe9aa1177ad0c~mv2.png", name: "avenue-finance.png",                  category: "avenues", page: "home", alt: "Finance" },

  // ---------- Home: decorative ----------
  { id: "11062b_e6d34c816aa7425bbe8c6be8f73e50b1~mv2.jpg", name: "decor-white-structure.jpg", category: "decor", page: "home", alt: "White Structure" },
  { id: "11062b_952485dce28e4eac9e9f09d63fdc9ada~mv2.jpg", name: "decor-sphere-stairs.jpg",   category: "decor", page: "home", alt: "Sphere on Spiral Stairs" },

  // ---------- Meet The Council 2025/26 ----------
  { id: "9a1ed2_b02b185d03fb4b41a90c604b7fb4253e~mv2.jpg", name: "council-jezon-fernando-dir.jpg",          category: "council", page: "meet-the-council", alt: "District Interact Representative — Jezon Fernando" },
  { id: "9a1ed2_a80e890264524d6e8e94d7a1b02579a4~mv2.jpg", name: "council-menuli-perera-secretary.jpg",     category: "council", page: "meet-the-council", alt: "District Interact Secretary — Menuli Perera" },
  { id: "9a1ed2_d85b1230c615420b98672b81ee6102db~mv2.jpg", name: "council-haroon-shamil-treasurer.jpg",     category: "council", page: "meet-the-council", alt: "District Interact Treasurer — Haroon Shamil" },
  { id: "9a1ed2_8b2ccb9b582b4351b338c448488f03ae~mv2.jpg", name: "council-yazid-niyas-adir.jpg",            category: "council", page: "meet-the-council", alt: "Assistant DIR — Yazid Niyas" },
  { id: "9a1ed2_3f226b90257946a9b20a1aa2ce41e2e4~mv2.jpg", name: "council-jenuka-de-silva-adir.jpg",        category: "council", page: "meet-the-council", alt: "Assistant DIR — Jenuka De Silva" },
  { id: "9a1ed2_7fcdfdd06b8141b980c60e429e0c9da2~mv2.jpg", name: "council-joshua-fernando-editor.jpg",      category: "council", page: "meet-the-council", alt: "District Interact Editor — Joshua Fernando" },
  { id: "9a1ed2_ea915b4f261e47e2b54edcb15b46dc07~mv2.jpg", name: "council-lakshin-fernando-editor.jpg",     category: "council", page: "meet-the-council", alt: "District Interact Editor — Lakshin Fernando" },
  { id: "9a1ed2_8018d6e537874bb08ee31b3be6b710ea~mv2.jpg", name: "council-yesith-gallage-saa.jpg",          category: "council", page: "meet-the-council", alt: "Co-Sergeant At Arms — Yesith Gallage" },
  { id: "9a1ed2_8825e73bd3b24ae8b76992e82cd4e406~mv2.jpg", name: "council-menoli-yatigammana-saa.jpg",      category: "council", page: "meet-the-council", alt: "Co-Sergeant At Arms — Menoli Yatigammana" },
  { id: "9a1ed2_a2297d3d32ea4328a862f3fdb31e3a26~mv2.jpg", name: "council-kaveeka-kulatunga-asst-sec.jpg",  category: "council", page: "meet-the-council", alt: "Co-Assistant Secretary — Kaveeka Kulatunga" },
  { id: "9a1ed2_3183d857843c48568b40a3c9c414fe1a~mv2.jpg", name: "council-seniya-rajugamuwa-asst-sec.jpg",  category: "council", page: "meet-the-council", alt: "Co-Assistant Secretary — Seniya Rajugamuwa" },
  { id: "9a1ed2_78861e7688fb42b48ed39762b8b90884~mv2.jpg", name: "council-abishek-maheshwaran-asst-treas.jpg", category: "council", page: "meet-the-council", alt: "Co-Assistant Treasurer — Abishek Maheshwaran" },
  { id: "9a1ed2_cc33b52acb6a434ebff1f91b65c75749~mv2.jpg", name: "council-piyathma-de-zoysa-asst-treas.jpg", category: "council", page: "meet-the-council", alt: "Co-Assistant Treasurer — Piyathma De Zoysa" },
  { id: "9a1ed2_d1ef5d5d7cdd4c8093258088a05851d2~mv2.png", name: "council-chanuth-amarasinghe-zc.png",      category: "council", page: "meet-the-council", alt: "Zonal Coordinator — Chanuth Amarasinghe" },
  { id: "9a1ed2_70c103fdb17547008cf4976b7dff0b1d~mv2.png", name: "council-shavini-weerasinghe-zc-maldives.png", category: "council", page: "meet-the-council", alt: "Zonal Coordinator / Maldives — Shavini Weerasinghe" },
  { id: "9a1ed2_1997872e53304afb86a373ac113d863a~mv2.jpg", name: "council-ethan-vishara-zr-colombo.jpg",    category: "council", page: "meet-the-council", alt: "Zonal Rep Colombo — Ethan Vishara" },
  { id: "9a1ed2_040b9adcac4a40e8944f2620cc644efc~mv2.png", name: "council-gihansa-ratnamalala-zr-negombo.png", category: "council", page: "meet-the-council", alt: "Zonal Rep Negombo — Gihansa Ratnamalala" },
  { id: "9a1ed2_43b0555c4bf440d5abe42d91f3bc068a~mv2.jpg", name: "council-vinuki-jayasena-zr-hill-tea.jpg", category: "council", page: "meet-the-council", alt: "Zonal Rep Hill/Tea Country — Vinuki Jayasena" },
  { id: "9a1ed2_5d6577d0753c457b873af19e6cec6088~mv2.png", name: "council-dhinil-rathnathilake-zr-kurunegala.png", category: "council", page: "meet-the-council", alt: "Zonal Rep Kurunegala — Dhinil Rathnathilake" },
  { id: "9a1ed2_aa019efc329a4ed99fa2235e8fbc3dd2~mv2.jpg", name: "council-veenu-ovinya-zr-down-south.jpg",  category: "council", page: "meet-the-council", alt: "Zonal Rep Down South — Veenu Ovinya" },
  { id: "9a1ed2_0e260eb5cba2480a819abf729f8e6218~mv2.png", name: "council-guruparan-paheerathan-zr-northern.png", category: "council", page: "meet-the-council", alt: "Zonal Rep Northern Peninsula — Guruparan Paheerathan" },
  { id: "9a1ed2_186daddfab9d47a497398725a6b8ee87~mv2.jpg", name: "council-charith-ekanayake-zr-rajarata.jpg", category: "council", page: "meet-the-council", alt: "Zonal Rep Rajarata & East — Charith Ekanayake" },
  { id: "9a1ed2_14c6bb7d179e4351a32e9c1e28c0466c~mv2.jpg", name: "council-rushty-abdeen-zr-gem-city.jpg",   category: "council", page: "meet-the-council", alt: "Zonal Rep Gem City — Rushty Abdeen" },
  { id: "9a1ed2_6508ec9bdb8a474c97f03219a17c7a1e~mv2.jpg", name: "council-umair-akram-dir-club-service.jpg", category: "council", page: "meet-the-council", alt: "Director of Club Service — Umair Akram" },
  { id: "9a1ed2_80fec6e656734557932070805467a430~mv2.jpg", name: "council-pabasara-warnajith-dir-community.jpg", category: "council", page: "meet-the-council", alt: "Director of Community Service — Pabasara Warnajith" },
  { id: "9a1ed2_c6e3c71547564e2495f48a0ba30ab565~mv2.jpg", name: "council-aneeqa-shafeel-dir-iu.jpg",       category: "council", page: "meet-the-council", alt: "Co-Director of International Understanding — Aneeqa Shafeel" },
  { id: "9a1ed2_f46781e7de964b39af79bc053493592e~mv2.jpg", name: "council-husni-habeeb-dir-iu.jpg",         category: "council", page: "meet-the-council", alt: "Co-Director of International Understanding — Husni Habeeb" },
  { id: "9a1ed2_e3ff82830aa74b44b28b6bbb46b161ce~mv2.jpg", name: "council-luvya-seelanatha-dir-rr.jpg",     category: "council", page: "meet-the-council", alt: "Director of Rotary–Rotaract Relations — Luvya Seelanatha" },
  { id: "9a1ed2_50f7374fb4ee4c93af332a781acf162a~mv2.jpg", name: "council-shihaad-silmy-dir-green-life.jpg", category: "council", page: "meet-the-council", alt: "Director of Green Life — Shihaad Silmy" },
  { id: "9a1ed2_9227afd240e742d39297e20f4036b66d~mv2.jpg", name: "council-ginura-kariyawasam-dir-finance.jpg", category: "council", page: "meet-the-council", alt: "Director of Finance — Ginura Kariyawasam" },
  { id: "9a1ed2_d272399b40f945f397e439961a13482e~mv2.jpg", name: "council-chenura-pathirana-dir-pr.jpg",    category: "council", page: "meet-the-council", alt: "Director of Public Relations — Chenura Pathirana" },
  { id: "9a1ed2_e965dda15d31442c9b4fb288cc25bdbc~mv2.jpg", name: "council-mahith-wijesekara-dir-media.jpg", category: "council", page: "meet-the-council", alt: "Director of the Media Crew — Mahith Wijesekara" },
  { id: "9a1ed2_48b2bc1e03bf448da74e8cec823184c8~mv2.png", name: "council-amitesha-sentitcumaran-chair-conf.png", category: "council", page: "meet-the-council", alt: "Chairperson Interact District Conference — Amitesha Sentitcumaran" },
  { id: "9a1ed2_48cf89e8d98e4f179433612c320d930b~mv2.jpg", name: "council-shenal-theshan-chair-interaction-colombo.jpg", category: "council", page: "meet-the-council", alt: "Chairperson Interaction Colombo — Shenal Theshan" },
  { id: "9a1ed2_e5511c3321af4a1881e09c18b6b39602~mv2.png", name: "council-thenuwara-rupasinghe-chair-ilt-colombo.png", category: "council", page: "meet-the-council", alt: "Chairperson ILT Colombo — Thenuwara Rupasinghe" },
  { id: "9a1ed2_fa0c26ca47f943f5b0b319331f2b5f96~mv2.png", name: "council-wenuri-amarasinghe-chair-ilt-hill.png", category: "council", page: "meet-the-council", alt: "Chairperson ILT Hill Country — Wenuri Amarasinghe" },
  { id: "9a1ed2_b1faa41c4e2e4b26981d639d0c285d86~mv2.jpg", name: "council-aaron-gunasekara-chair-bizconnect.jpg", category: "council", page: "meet-the-council", alt: "Chairperson BizConnect — Aaron Gunasekara" },
  { id: "9a1ed2_bd219a85d6b4422aa98bf027869f65d3~mv2.jpg", name: "council-zeyna-nuzrath-chair-cycle-of-hope.jpg", category: "council", page: "meet-the-council", alt: "Chairperson Cycle of Hope — Zeyna Nuzrath Ahamed" },

  // ---------- College of DIRs (portraits) ----------
  { id: "9a1ed2_d9c7f3c4361440b68a2fdf0dde593fbc~mv2.jpg", name: "dir-2025-26-jezon-fernando.jpg",        category: "dirs", page: "college-of-dirs", alt: "DIR 2025/26 — Jezon Fernando" },
  { id: "9a1ed2_049212220d5e4086a3f21551cd231cd5~mv2.jpg", name: "dir-2024-25-damian-de-cruz.jpg",        category: "dirs", page: "college-of-dirs", alt: "DIR 2024/25 — Damian De Cruz" },
  { id: "9a1ed2_0bd8a448a8ca4f769f69c1c73af6e88e~mv2.jpg", name: "dir-2023-24-aamir-akram.jpg",           category: "dirs", page: "college-of-dirs", alt: "DIR 2023/24 — Aamir Akram" },
  { id: "9a1ed2_8d318854147d46e8ac5a4b6e32ca1d62~mv2.jpg", name: "dir-2022-23-julian-fernandopulle.jpg",  category: "dirs", page: "college-of-dirs", alt: "DIR 2022/23 — Julian Fernandopulle" },
  { id: "9a1ed2_f489a57897314101bee6589e1c928db0~mv2.jpg", name: "dir-2021-22-murthaaz-barry.jpg",        category: "dirs", page: "college-of-dirs", alt: "DIR 2021/22 — Murthaaz Barry" },
  { id: "9a1ed2_6f60210fac084f3992d133c245117f0f~mv2.jpg", name: "dir-2020-21-rahul-fernandez.jpg",       category: "dirs", page: "college-of-dirs", alt: "DIR 2020/21 — Rahul Fernandez" },
  { id: "9a1ed2_cae5ca404cf346228d19f154275a70a1~mv2.jpg", name: "dir-2019-20-wiranya-divitotawela.jpg",  category: "dirs", page: "college-of-dirs", alt: "DIR 2019/20 — Wiranya Divitotawela" },
  { id: "9a1ed2_f0d6a7af42434cdbbd15b0a913c85ad3~mv2.jpg", name: "dir-2018-19-asel-karannagoda.jpg",      category: "dirs", page: "college-of-dirs", alt: "DIR 2018/19 — Asel Karannagoda" },
  { id: "9a1ed2_377678ad3edd441eb3465c7e911bf347~mv2.jpg", name: "dir-2017-18-mohommed-awoon.jpg",        category: "dirs", page: "college-of-dirs", alt: "DIR 2017/18 — Mohommed Awoon" },
  { id: "9a1ed2_5cbbecbc2ffc4b499c770dd660d643e1~mv2.jpg", name: "dir-2016-17-chathula-fernando.jpg",     category: "dirs", page: "college-of-dirs", alt: "DIR 2016/17 — Chathula Fernando" },
  { id: "9a1ed2_72bb09dded7f430b8085b64c1033fbec~mv2.jpg", name: "dir-2015-16-fabian-schokman.jpg",       category: "dirs", page: "college-of-dirs", alt: "DIR 2015/16 — Fabian D K Schokman" },
  { id: "9a1ed2_57501398c21a471291261de705e6e5e8~mv2.png", name: "dir-2014-15-sulaiman-rameez.png",       category: "dirs", page: "college-of-dirs", alt: "DIR 2014/15 — Sulaiman Rameez" },
  { id: "9a1ed2_a3a7e5ba2fce4708953ee8a9a0456128~mv2.jpg", name: "dir-2013-14-sandupama-basnayake.jpg",   category: "dirs", page: "college-of-dirs", alt: "DIR 2013/14 — Sandupama Basnayake" },
  { id: "9a1ed2_08fa9c8f033d43a0b72a13f823ced64f~mv2.jpg", name: "dir-2012-13-ruvindu-bandara.jpg",       category: "dirs", page: "college-of-dirs", alt: "DIR 2012/13 — Ruvindu Bandara" },
  { id: "9a1ed2_c29ceebd1fb647d1bdcf800108f4cdf4~mv2.jpg", name: "dir-2011-12-dinuka-sumithraarachchi.jpg", category: "dirs", page: "college-of-dirs", alt: "DIR 2011/12 — Dinuka Sumithraarachchi" },
  { id: "9a1ed2_001dc6e804c24a688fd2bc6dddf5a85b~mv2.jpg", name: "dir-2010-11-harinda-senaratne.jpg",     category: "dirs", page: "college-of-dirs", alt: "DIR 2010/11 — Harinda Senaratne" },

  // ---------- Media Crew: service category images ----------
  { id: "4ed48c_a1fd238edbba4180a66adad28d27991f~mv2.jpg", name: "media-photography.jpg",   category: "media-crew", page: "media-crew", alt: "Photography" },
  { id: "4ed48c_56172333da4d41689587f238a8d423f9~mv2.jpg", name: "media-videography.jpg",   category: "media-crew", page: "media-crew", alt: "Videography" },
  { id: "4ed48c_8b6a13b299884b8fa53a95eca5180ee6~mv2.jpg", name: "media-livestreaming.jpg", category: "media-crew", page: "media-crew", alt: "Live Streaming" },
  { id: "4ed48c_268c48a4d4434a728b695468246413ac~mv2.jpg", name: "media-designing.jpg",     category: "media-crew", page: "media-crew", alt: "Designing" },
  { id: "4ed48c_83338495cace4c1ea881a2cc5218688a~mv2.jpg", name: "media-compering.jpg",     category: "media-crew", page: "media-crew", alt: "Compering" },
  { id: "4ed48c_8afa9bd543b9436bb67942eb2aeda534~mv2.jpg", name: "media-photo-booths.jpg",  category: "media-crew", page: "media-crew", alt: "Photo Booths" },

  // ---------- Blog / News thumbnails ----------
  { id: "9a1ed2_c2abbec0f9cc480f89791700f0a40338~mv2.jpg", name: "blog-shawn-shiek-tribute.jpg",      category: "blog", page: "news", alt: "Tribute to Late PDIR Shawn Shiek" },
  { id: "9a1ed2_734280482c214d7a89a7af7d46ab0320~mv2.jpg", name: "blog-35th-district-assembly.jpg",   category: "blog", page: "news", alt: "35th Interact District Assembly 2025" },

  // ---------- Past Council 2024/25 (Damian De Cruz's council) portraits ----------
  { id: "9a1ed2_8d1c58434f8e4d41a10cd9d52f1a00c0~mv2.jpg", name: "council-2024-25-damian-de-cruz-dir.jpg",          category: "council-2024-25", page: "meet-the-council-2024-25", alt: "DIR — PHF Int. Damian De Cruz" },
  { id: "9a1ed2_f14435e9708944d2a060d9cf6db72e46~mv2.jpg", name: "council-2024-25-ashalee-pathirana-secretary.jpg", category: "council-2024-25", page: "meet-the-council-2024-25", alt: "Secretary — Int. Ashalee Pathirana" },
  { id: "9a1ed2_082af13227ad49ff859a4f4613d1628f~mv2.jpg", name: "council-2024-25-haarene-arasaratnam-treasurer.jpg", category: "council-2024-25", page: "meet-the-council-2024-25", alt: "Treasurer — PHF Int. Haarene Arasaratnam" },
  { id: "9a1ed2_7b8144eb83994e969276c4f1f3af9fbb~mv2.jpg", name: "council-2024-25-danindu-fernando-adir.jpg",        category: "council-2024-25", page: "meet-the-council-2024-25", alt: "Assistant DIR — PHF Int. Danindu Fernando" },
  { id: "9a1ed2_8524f16c7cbc4ee4bed00e182f3add6f~mv2.jpg", name: "council-2024-25-jezon-fernando-editor.jpg",       category: "council-2024-25", page: "meet-the-council-2024-25", alt: "Editor — Int. PP. Jezon Fernando" },
  { id: "9a1ed2_2d3c4665879c43c3b0b6d88dadbacd32~mv2.jpg", name: "council-2024-25-lamha-rizwan-saa.jpg",            category: "council-2024-25", page: "meet-the-council-2024-25", alt: "Co-Sergeant At Arms — PHF Int. Lamha Rizwan" },
  { id: "9a1ed2_99348cf20c8f4ed1b3b7d2a670b2abe1~mv2.jpg", name: "council-2024-25-yumeth-rathnayake-saa.jpg",       category: "council-2024-25", page: "meet-the-council-2024-25", alt: "Co-Sergeant At Arms — PHF Int. Yumeth Rathnayake" },
  { id: "9a1ed2_412aaaf7142f4c0db453f64a4ef90725~mv2.jpg", name: "council-2024-25-minali-bamunusinghe-asst-sec.jpg", category: "council-2024-25", page: "meet-the-council-2024-25", alt: "Co-Assistant Secretary — Int. PP. Minali Bamunusinghe Arachchi" },
  { id: "9a1ed2_f9f276d7502042099a6b39629d40afbf~mv2.jpg", name: "council-2024-25-sameeha-nizamdeen-asst-sec.jpg",  category: "council-2024-25", page: "meet-the-council-2024-25", alt: "Co-Assistant Secretary — PHF Int. Sameeha Nizamdeen" },
  { id: "9a1ed2_2300417cf5df4dd9ab4bf218da4afb0d~mv2.jpg", name: "council-2024-25-aaishah-shafraz-asst-treas.jpg",  category: "council-2024-25", page: "meet-the-council-2024-25", alt: "Assistant Treasurer — PHF Int. Aaishah Shafraz" },
  { id: "9a1ed2_d13828baa070489583847b8cdf694711~mv2.jpg", name: "council-2024-25-joshua-fernando-asst-editor.jpg", category: "council-2024-25", page: "meet-the-council-2024-25", alt: "Co-Assistant Editor — Int. Joshua Fernando" },
  { id: "9a1ed2_5262745750f2493c89cf965806f74733~mv2.jpg", name: "council-2024-25-yazid-niyas-asst-editor.jpg",     category: "council-2024-25", page: "meet-the-council-2024-25", alt: "Co-Assistant Editor — Int. PP. Yazid Niyas" },

  // ---------- Past Council 2022/23 (Julian Fernandopulle's council) portraits ----------
  { id: "4ed48c_2308434cb7174c639f60f0b84ee1ac74~mv2.jpg", name: "council-2022-23-julian-fernandopulle-dir.jpg",     category: "council-2022-23", page: "meet-the-council-2022-23", alt: "DIR — Int. PP. Julian Fernandopulle" },
  { id: "4ed48c_e3a5e95aeb0248a1afd3694f426b51ca~mv2.jpg", name: "council-2022-23-onellie-jayawardena-secretary.jpg", category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Secretary — Int. PP. Onellie Jayawardena" },
  { id: "4ed48c_b1c453e3f0f24109909b38ae7e89eb19~mv2.jpg", name: "council-2022-23-rezon-david-treasurer.jpg",        category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Treasurer — Int. Rezon David" },
  { id: "4ed48c_c3254e8165a14b2587132b175144737f~mv2.png", name: "council-2022-23-thareen-jayadewa-adir.png",        category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Assistant DIR — Int. PP. Thareen Jayadewa" },
  { id: "4ed48c_642ae81217f54b6289700f81fb16cee9~mv2.jpg", name: "council-2022-23-janindu-ratnayake-saa.jpg",        category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Co-Sergeant At Arms — Int. Janindu Ratnayake" },
  { id: "4ed48c_6ba4e80beba34bf28ceff7a4b572b4e7~mv2.jpg", name: "council-2022-23-janudi-yatagampitiya-saa.jpg",     category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Co-Sergeant At Arms — Int. Janudi Yatagampitiya" },
  { id: "4ed48c_4593edf88f03493499cb5d7be874c758~mv2.jpg", name: "council-2022-23-senandi-jayawardena-asst-sec.jpg", category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Co-Assistant Secretary — Int. PP. Senandi Jayawardena" },
  { id: "4ed48c_a148a312578a48e88f5e5500fa5386ae~mv2.jpg", name: "council-2022-23-chenuli-wijayanama-asst-sec.jpg",  category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Co-Assistant Secretary — Int. PP. Chenuli Wijayanama" },
  { id: "4ed48c_da0ccd23af7145488794909bbf47e25a~mv2.jpg", name: "council-2022-23-uleena-udabage-asst-treas.jpg",    category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Assistant Treasurer — Int. PP. Uleena Udabage" },
  { id: "4ed48c_e4e006686d494c519701a0bafea05e31~mv2.jpg", name: "council-2022-23-mihin-senath-zc.jpg",              category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Zonal Coordinator — Int. PP. Mihin Senath" },
  { id: "4ed48c_cdb7796a579b4a22a7998e0f7613b1f4~mv2.jpg", name: "council-2022-23-samiru-aponso-zc-maldives.jpg",    category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Zonal Coordinator / Maldives — Int. PP. Samiru Aponso" },
  { id: "4ed48c_b68d88105b4940eaa6e6a8bc87830c43~mv2.jpg", name: "council-2022-23-amaan-zahid-colombo-negombo.jpg",  category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Head Colombo & Negombo Zones — Int. PP. Amaan Zahid" },
  { id: "4ed48c_2c20679e944e49c292cb9ec1e6e42e87~mv2.jpg", name: "council-2022-23-omethra-abeykoon-kandy.jpg",       category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Head Kandy Zone — Int. PP. Omethra Abeykoon" },
  { id: "4ed48c_9ebd477700074a84a7f8e257a8c4ecc9~mv2.jpg", name: "council-2022-23-yuvani-thudugala-kurunegala.jpg",  category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Head Kurunegala & Kegalle Zones — Int. PP. Yuvani Thudugala" },
  { id: "4ed48c_f265017411dc45b5b06d5d9a428790b8~mv2.jpg", name: "council-2022-23-ashrath-rumie-galle.jpg",          category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Head Galle & Matara Zones — Int. PP. Ashrath Rumie" },
  { id: "4ed48c_bca152c7e0c7426ebdbc8dd5969b587b~mv2.jpg", name: "council-2022-23-thisuri-nanayakkara-rajarata.jpg", category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Head Rajarata Zone — Int. PP. Thisuri Nanayakkara" },
  { id: "4ed48c_ce489a6ded39428db28623dfdc6ef764~mv2.jpg", name: "council-2022-23-raveendran-panojan-jaffna.jpg",    category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Head Jaffna & Mannar Zones — Int. Raveendran Panojan" },
  { id: "4ed48c_8df6c4928aa043ba846dbea1c93dbb60~mv2.jpg", name: "council-2022-23-nuwangi-chandrakirthi-tea-country.jpg", category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Head Ampara & Tea Country Zones — Int. PP. Nuwangi Chandrakirthi" },
  { id: "4ed48c_2717dba4eb4e42558a2ab9b7a672efe8~mv2.jpg", name: "council-2022-23-ishini-jayawardhana-gem-city.jpg", category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Head Gem City Zone — Int. Ishini Jayawardhana" },
  { id: "4ed48c_5b0913c814ea4da2b4c6df647d635dd6~mv2.jpg", name: "council-2022-23-shakeel-hassimdeen-dir-club.jpg",  category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Director of Club Service — Int. Shakeel Hassimdeen" },
  { id: "4ed48c_aed5f81ef0b046d1bcfc17a78d11367b~mv2.jpg", name: "council-2022-23-naasith-nauf-dir-community.jpg",   category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Director of Community Service — Int. Naasith Nauf" },
  { id: "4ed48c_b1510572fe2b4106b80038554a43f823~mv2.jpg", name: "council-2022-23-tashiya-jayman-dir-iu.jpg",        category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Director of International Understanding — Int. PP. Tashiya Jayman" },
  { id: "4ed48c_842b5d7e43b84205b3adc3379f14e5ef~mv2.jpg", name: "council-2022-23-nabeel-barry-dir-rr.jpg",          category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Director of Rotary–Rotaract Relations — Int. PP. Nabeel Barry" },
  { id: "4ed48c_d3a312be7dbf47afb4f08fc6360208e2~mv2.jpg", name: "council-2022-23-abdullah-rumi-reyal-dir-green.jpg", category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Director of Green Life — Int. Abdullah Rumi Reyal" },
  { id: "4ed48c_cdafae509a7f4f9f8102d9a68a080a3b~mv2.jpg", name: "council-2022-23-usmaan-mowlana-dir-finance.jpg",   category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Director of Finance & Chair of District Assembly — Int. PP. Usmaan Mowlana" },
  { id: "4ed48c_984a695a833640fabf95676a45bb3e0c~mv2.jpg", name: "council-2022-23-fadhil-fazil-dir-pr.jpg",          category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Co-Editor & Director of PR — Int. Fadhil Fazil" },
  { id: "4ed48c_a355545858314901a8418f91d8072473~mv2.jpg", name: "council-2022-23-ashfaq-fazlin-dir-media.jpg",      category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Co-Editor & Director of Media Crew — Int. Ashfaq Fazlin" },
  { id: "4ed48c_7709294616454a73acda0c6a3663b895~mv2.jpg", name: "council-2022-23-abdullah-siddeek-chair-conf.jpg", category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Chairperson of District Conference — Int. Abdullah Siddeek" },
  { id: "4ed48c_1d7c40a397ce47c79628d82e5a9d50f6~mv2.jpg", name: "council-2022-23-joshua-almeida-chair-interaction-colombo.jpg", category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Chairperson of Interaction Colombo — Int. Joshua Almeida" },
  { id: "4ed48c_784fcada221c4828bc86434297c721fd~mv2.jpg", name: "council-2022-23-ramel-bandaranayake-chair-interaction-kandy.jpg", category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Chairperson of Interaction Kandy — Int. Ramel Bandaranayake" },
  { id: "4ed48c_ce96405732e141dfaac198a1fcae1e9d~mv2.jpg", name: "council-2022-23-nishok-ranasinghe-chair-ilt.jpg",  category: "council-2022-23", page: "meet-the-council-2022-23", alt: "Chairperson of Interact Leadership Training — Int. PP. Nishok Ranasinghe" },

  // ---------- Archive year header / RI-theme logos ----------
  { id: "9a1ed2_ab753e228432479eb87f09fa04f9892b~mv2.jpg", name: "archive-2024-25-header.jpg", category: "archive-logos", page: "ri-year-2024-25", alt: "RI Year 2024/25 header" },
  { id: "9a1ed2_6e5e6472b76445db86c594880cf8f5fa~mv2.png", name: "archive-2022-23-header.png", category: "archive-logos", page: "ri-year-2022-23", alt: "RI Year 2022/23 header (IR.png)" },
  { id: "9a1ed2_0640048d91f44984acb0e7a5c22002e7~mv2.png", name: "archive-2020-21-logo.png",   category: "archive-logos", page: "copy-of-ri-year-2022-23", alt: "RI Year 2020/21 logo" },
  { id: "9a1ed2_9cc6f29a553e491dbba5032f548a501c~mv2.jpg", name: "archive-1992-93-logo.jpg",   category: "archive-logos", page: "copy-of-ri-year-1990-91", alt: "RI Year 1992/93 logo" },
  { id: "9a1ed2_c3685553ec5045e0b55fd45d1b78ef6d~mv2.jpg", name: "archive-1993-94-logo.jpg",   category: "archive-logos", page: "copy-of-ri-year-1992-93", alt: "RI Year 1993/94 logo" },
  { id: "9a1ed2_9f3a1fc76815497e8229bcf446223a21~mv2.jpg", name: "archive-1994-95-logo.jpg",   category: "archive-logos", page: "copy-of-ri-year-1993-94", alt: "RI Year 1994/95 logo" },
  { id: "9a1ed2_6f59025efe034957b48b732ab9dbe2f7~mv2.jpg", name: "archive-1995-96-logo.jpg",   category: "archive-logos", page: "copy-of-ri-year-1994-95", alt: "RI Year 1995/96 logo" },
  { id: "9a1ed2_3a9fa7a0751f4bdda411414c1c591437~mv2.jpg", name: "archive-1996-97-logo.jpg",   category: "archive-logos", page: "copy-of-ri-year-1995-96", alt: "RI Year 1996/97 logo" },
  { id: "9a1ed2_11f239760fa94dfdbdbfcec5e40e7fb5~mv2.jpg", name: "archive-1997-98-logo.jpg",   category: "archive-logos", page: "copy-of-ri-year-1996-97", alt: "RI Year 1997/98 logo" },
  { id: "9a1ed2_b9985a5ada33435fb36e642bacbf5366~mv2.jpg", name: "archive-1998-99-logo.jpg",   category: "archive-logos", page: "copy-of-ri-year-1997-98", alt: "RI Year 1998/99 logo" },
  { id: "9a1ed2_3f2bf5bab2df4a61a3044ed58bdfe20e~mv2.jpg", name: "archive-1999-2000-logo.jpg", category: "archive-logos", page: "copy-of-ri-year-1998-99", alt: "RI Year 1999/2000 logo" },
  { id: "9a1ed2_768ad4c2aa4f43bc82d54165ef1d242c~mv2.jpg", name: "archive-2000-01-logo.jpg",   category: "archive-logos", page: "copy-of-ri-year-1999-2000", alt: "RI Year 2000/01 logo" },

  // ---------- DIMUN '25 (District Interact Model United Nations) ----------
  { id: "9a1ed2_50f1a75483094d789df004eee732e692~mv2.png", name: "dimun-logo-main.png",        category: "dimun", page: "dimun25",               alt: "DIMUN '25 logo (main)" },
  { id: "9a1ed2_46815450eb3e4997a2f22e351bde9126~mv2.png", name: "dimun-logo-alt.png",         category: "dimun", page: "dimun25 / about-dimun25", alt: "DIMUN '25 logo (alt)" },
  { id: "e78279_8d8a767970104d9780e1ce6aacd63502~mv2.png", name: "dimun-logo-registrations.png", category: "dimun", page: "dimun25-registrations", alt: "DIMUN '25 logo (registrations)" },
  { id: "9a1ed2_73f59eee040f4ebb909ded6fc47c5630~mv2.png", name: "dimun-background-pattern.png", category: "dimun", page: "dimun25 (site bg)",     alt: "DIMUN background pattern" },
  { id: "9699ce_0bd9232bf90f47bb9634f9c47d15b298~mv2.png", name: "dimun-seniya-rajugamuwa-chairperson.png",  category: "dimun", page: "dimun25", alt: "DIMUN Project Chairperson — Int. Seniya Rajugamuwa" },
  { id: "9699ce_3cba54eb889243e2a2569e14dfc84316~mv2.png", name: "dimun-aneeqa-shafeel-co-secretary.png",     category: "dimun", page: "dimun25", alt: "DIMUN Project Co-Secretary — Int. Aneeqa Shafeel" },
  { id: "9699ce_5dc91ecb83a94c3092b54b99b2e1b3c8~mv2.png", name: "dimun-kaveeka-kulatunga-treasurer.png",      category: "dimun", page: "dimun25", alt: "DIMUN Project Treasurer — Int. Kaveeka Kulatunga" },
  { id: "e78279_1e98c440da46450e99d22a180e23ac28~mv2.png", name: "dimun-piyathma-de-zoysa-treasurer.png",     category: "dimun", page: "dimun25", alt: "DIMUN Project Treasurer — Int. PP. Piyathma De Zoysa" },
  { id: "e78279_e90e8a65d8744c71871cb49568f94c2e~mv2.png", name: "dimun-committee-ecosoc.png",  category: "dimun", page: "committees", alt: "ECOSOC committee logo" },
  { id: "e78279_9acfcb20aceb43478138410d4707c175~mv2.png", name: "dimun-committee-who.png",     category: "dimun", page: "committees", alt: "WHO committee logo" },
  { id: "e78279_f363e1d375944383bcb50011347118f7~mv2.png", name: "dimun-committee-unw.png",     category: "dimun", page: "committees", alt: "UN Women committee logo" },
  { id: "e78279_628e1dd693574e11bfcafe8487d40312~mv2.png", name: "dimun-committee-unsc.png",    category: "dimun", page: "committees", alt: "UNSC committee logo" },
  { id: "e78279_b6f877be183b4ed5ab9395090df7b123~mv2.png", name: "dimun-committee-unfccc.png",  category: "dimun", page: "committees", alt: "UNFCCC committee logo" },
  { id: "e78279_55a04d92d1d24bddb302fb60ef79dd21~mv2.png", name: "dimun-committee-unhrc.png",   category: "dimun", page: "committees", alt: "UNHRC committee logo" },

  // ---------- Social media icons ----------
  { id: "fdcfaba150fc427da298a00cb09d91c1.png", name: "icon-instagram.png", category: "social-icons", page: "global (footer)", alt: "Instagram" },
  { id: "ce6ec7c11b174c0581e20f42bb865ce3.png", name: "icon-facebook.png",  category: "social-icons", page: "global (footer)", alt: "Facebook" },
  { id: "444f49eac2e348f89128293b0c6432fd.png", name: "icon-twitter.png",   category: "social-icons", page: "global (footer)", alt: "Twitter" },
  { id: "8efda6398c724b5ea342287bfe3f5ed0.png", name: "icon-linkedin.png",  category: "social-icons", page: "global (footer)", alt: "LinkedIn" },
  { id: "71ac09a5a92848cc943bf2ca2a09a6d0.png", name: "icon-youtube.png",   category: "social-icons", page: "global (footer)", alt: "YouTube" },
  { id: "11062b_94e1c6b464c9454a80fc03a2ce369a6d~mv2.png", name: "icon-tiktok.png", category: "social-icons", page: "global (footer)", alt: "TikTok" }
];

// Build the original (full-resolution) URL for a manifest id.
function originalUrl(id) {
  return "https://static.wixstatic.com/media/" + id;
}

// Export for Node; in the browser these become globals.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { IMAGE_MANIFEST: IMAGE_MANIFEST, originalUrl: originalUrl };
}
