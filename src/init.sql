﻿SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS  `book`;
CREATE TABLE `book` (
  `tagId` varchar(24) NOT NULL,
  `isbn` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `summary` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tagId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS  `lend`;
CREATE TABLE `lend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tagId` varchar(255) NOT NULL,
  `studentId` varchar(255) NOT NULL,
  `isReturn` int(1) NOT NULL DEFAULT '0',
  `lendTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `returnTime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

insert into `lend`(`id`,`tagId`,`studentId`,`isReturn`,`lendTime`,`returnTime`) values
('1','0075212111019719204dc9','1203020301','1','2015-06-08 22:45:54','2015-06-08 22:48:10'),
('2','007521211101971910520c','1203020301','1','2015-06-08 22:45:54','2015-06-08 22:48:10'),
('3','007521211101972020456f','1203020301','1','2015-06-08 22:45:54','2015-06-08 22:48:10');
DROP TABLE IF EXISTS  `student_bind`;
CREATE TABLE `student_bind` (
  `studentId` varchar(255) NOT NULL,
  `uid` varchar(255) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`studentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS  `student_enter_log`;
CREATE TABLE `student_enter_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` varchar(12) NOT NULL,
  `in` int(1) DEFAULT '0',
  `out` int(1) DEFAULT '0',
  `creatTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS  `study_room_seat`;
CREATE TABLE `study_room_seat` (
  `seat` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` varchar(12) NOT NULL,
  `isOut` int(1) DEFAULT '0',
  `outTime` timestamp NULL DEFAULT NULL,
  `creatTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`seat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS  `wit_college`;
CREATE TABLE `wit_college` (
  `cid` int(11) NOT NULL,
  `college_name` varchar(50) NOT NULL,
  PRIMARY KEY (`cid`),
  KEY `id` (`cid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

insert into `wit_college`(`cid`,`college_name`) values
('1','环境与城市建设学院'),
('2','材料科学与工程学院'),
('3','机电工程学院'),
('4','电气信息学院'),
('5','计算机科学与工程学院'),
('6','化工与制药学院'),
('7','艺术设计学院'),
('8','化学与环境工程学院'),
('9','理学院'),
('10','外语学院'),
('11','体育部'),
('20','管理学院'),
('21','法商学院'),
('22','国际学院'),
('23','马克思主义学院'),
('30','职业技术学院'),
('40','邮电与信息工程学院'),
('41','湖北广播电视大学'),
('43','荆门职业技术学院'),
('52','财务处'),
('53','分析测试中心'),
('54','校办'),
('55','工会'),
('56','国际交流与合作处'),
('57','后勤管理处'),
('58','后勤服务总公司'),
('59','工程实践教学中心'),
('60','基建处'),
('61','纪委监察处'),
('62','教务处'),
('63','科技处'),
('64','离退休工作处'),
('65','人事处'),
('66','审计处'),
('67','团委'),
('68','物资供应中心'),
('69','网络信息中心'),
('71','宣传部'),
('72','学报'),
('73','学生处'),
('74','研究生处'),
('75','校医院'),
('76','招生与毕业生工作处'),
('77','组织部'),
('85','图书馆'),
('87','武装部'),
('90','辅修双学位'),
('95','交换生学院'),
('99','其他人员');
DROP TABLE IF EXISTS  `wit_idcard_info`;
CREATE TABLE `wit_idcard_info` (
  `id` bigint(6) NOT NULL,
  `info` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS  `wit_library_class`;
CREATE TABLE `wit_library_class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sign` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=563 DEFAULT CHARSET=utf8;

insert into `wit_library_class`(`id`,`sign`,`content`) values
('1','A','马克思主义、列宁主义、毛泽东思想'),
('2','A1','马克思、恩格斯著作'),
('3','A2','列宁著作'),
('4','A3','斯大林著作'),
('5','A4','毛泽东著作'),
('6','A49','邓小平著作'),
('7','A5','马克思、恩格斯、列宁、斯大林、毛泽东、邓小平著作汇编'),
('8','A7','马克思、恩格斯、列宁、斯大林、毛泽东、邓小平生平和传记'),
('9','A8','马克思主义、列宁主义、毛泽东思想邓小平理论的学习和研究'),
('10','B','哲学'),
('11','B0','哲学理论'),
('12','B1','世界哲学'),
('13','B2','中国哲学'),
('14','B3','亚洲哲学'),
('15','B4','非洲哲学'),
('16','B5','欧洲哲学'),
('17','B6','大洋洲哲学'),
('18','B7','美洲哲学'),
('19','B80','逻辑科学（总论）'),
('20','B81','逻辑学'),
('21','B82','伦理学'),
('22','B83','美学'),
('23','B84','心理学'),
('24','B9','无神论、宗教'),
('25','C','社会科学总论'),
('26','C0','社会科学理论与方法论'),
('27','C1','社会科学现状及发展'),
('28','C2','社会科学机构、团体、会议'),
('29','C3','社会科学研究方法'),
('30','C4','社会科学教育与普及'),
('31','C5','社会科学丛书、文集、连续性出版物'),
('32','C6','社会科学参考工具书'),
('33','C[7]','社会科学文献检索工具书'),
('34','C8','统计学'),
('35','C91','社会学'),
('36','C92','人口学'),
('37','C93','管理学'),
('38','C[94]','系统科学'),
('39','C95','民族学'),
('40','C96','人才学'),
('41','C97','劳动科学'),
('42','D','政治、法律'),
('43','D0','政治理论'),
('44','D1','共产主义运动'),
('45','D2','中国共产党'),
('46','D3','各国共产党'),
('47','D4','工人、农民、青年、妇女运动与组织'),
('48','D5','世界政治'),
('49','D6','中国政治'),
('50','D73/77','各国政治'),
('51','D8','外交、国际关系'),
('52','D9','法律'),
('53','E','军事'),
('54','E0','军事理论'),
('55','E1','世界军事'),
('56','E2','中国军事'),
('57','E3/7','各国军事'),
('58','E8','战略学、战役学、战术学'),
('59','E9','军事技术'),
('60','E99','军事地形学、军事地理学'),
('61','F','经济'),
('62','F0','政治经济学'),
('63','F0-0','马克思主义政治经济学（总论）'),
('64','F01','经济学基本问题'),
('65','F02','前资本主义社会生产方式'),
('66','F03','资本主义社会生产方式'),
('67','F04','社会主义社会生产方式'),
('68','F05','共产主义社会生产方式'),
('69','F06','经济学分支学科'),
('70','F08','各科经济学'),
('71','F09','经济思想史'),
('72','F1','世界各国经济概况、经济史、经济地理'),
('73','F11','世界经济、国际经济关系'),
('74','F12','中国经济'),
('75','F13/17','各国经济'),
('76','F2','经济计划与管理'),
('77','F20','国民经济管理'),
('78','F21','经济计划'),
('79','F22','经济计算、经济数学方法'),
('80','F23','会计'),
('81','F239','审计'),
('82','F24','劳动经济'),
('83','F25','物资经济'),
('84','F27','企业经济'),
('85','F28','基本经济建设'),
('86','F29','城市与市政经济'),
('87','F3','农业经济'),
('88','F30','农业经济理论'),
('89','F31','世界农业经济'),
('90','F32','中国农业经济'),
('91','F33/37','各国农业经济'),
('92','F4','工业经济'),
('93','F40','工业经济理论'),
('94','F41','世界工业经济'),
('95','F42','中国工业经济'),
('96','F43/47','各国工业经济'),
('97','F49','信息产业经济（总论）'),
('98','F5','交通运输经济'),
('99','F50','交通运输经济理论'),
('100','F51','世界各国概况'),
('101','F53','铁路运输经济'),
('102','F54','陆路、公路运输经济'),
('103','F55','水路运输经济'),
('104','F56','航空运输经济'),
('105','F57','城市交通运输经济'),
('106','F59','旅游经济'),
('107','F590','旅游经济理论与方法'),
('108','F591','世界旅游事业'),
('109','F592','中国旅游事业'),
('110','F593/597','各国旅游事业'),
('111','F6','邮电经济'),
('112','F60','邮电经济理论'),
('113','F61','邮政'),
('114','F62','电信'),
('115','F63','世界各国邮电事业'),
('116','F7','贸易经济'),
('117','F71','国内贸易经济'),
('118','F72','中国国内贸易经济'),
('119','F73','世界各国国内贸易经济'),
('120','F74','国际贸易'),
('121','F75','各国对外贸易'),
('122','F76','商品学'),
('123','F8','财政、金融'),
('124','F81','财政、国家财政'),
('125','F82','货币'),
('126','F83','金融、银行'),
('127','F84','保险'),
('128','G','文化、科学、教育、体育'),
('129','G0','文化理论'),
('130','G1','世界各国文化与文化事业'),
('131','G2','信息与知识传播'),
('132','G20','信息与传播理论'),
('133','G21','新闻学、新闻事业'),
('134','G22','广播、电视事业'),
('135','G23','出版事业'),
('136','G24','群众文化事业'),
('137','G25','图书馆学、图书馆事业'),
('138','G26','博物馆学、博物馆事业'),
('139','G27','档案学、档案事业'),
('140','G3','科学、科学研究'),
('141','G30','科学研究理论'),
('142','G31','科学研究工作'),
('143','G32','世界各国科学研究事业'),
('144','G35','情报学、情报工作'),
('145','G4','教育'),
('146','G40','教育学'),
('147','G41','思想政治教育、德育'),
('148','G42','教学理论'),
('149','G43','电化教育'),
('150','G44','教育心理学'),
('151','G45','教师与学生'),
('152','G46','教育行政'),
('153','G47','学校管理'),
('154','G48','学校建筑和设备管理'),
('155','G51','世界各国教育事业'),
('156','G52','中国教育事业'),
('157','G53/57','各国教育事业'),
('158','G61','学前教育、幼儿教育'),
('159','G62','初等教育'),
('160','G63','中等教育'),
('161','G64','高等教育'),
('162','G65','师范教育'),
('163','G71','职业技术教育'),
('164','G72','成人教育、业余教育'),
('165','G74','华侨教育、侨民教育'),
('166','G75','少数民族教育'),
('167','G76','特殊教育'),
('168','G77','社会教育'),
('169','G78','家庭教育'),
('170','G79','自学'),
('171','G8','体育'),
('172','G80','体育理论'),
('173','G81','世界各国体育事业'),
('174','G818','运动场地与设备'),
('175','G819','体育运动技术（总论）'),
('176','G82','田径运动'),
('177','G83','体操运动'),
('178','G84','球类运动'),
('179','G85','武术及民族形式体育'),
('180','G86','水上、冰上与雪上运动'),
('181','G87','其他体育运动'),
('182','G89','文体活动'),
('183','H','语言、文字'),
('184','H0','语言学'),
('185','H002','语言规划'),
('186','H003','语言分类'),
('187','H004','语言的分布'),
('188','H01','语音学'),
('189','H02','文字学'),
('190','H03','语义学、语用学、词汇学、词义学'),
('191','H05','写作学与修辞学'),
('192','H059','翻译学'),
('193','H06','字典学'),
('194','H07','方言学'),
('195','H08','应用语言学'),
('196','H09','语文教学'),
('197','H1','汉语'),
('198','H11','语音'),
('199','H12','文字学'),
('200','H13','语义、词汇、词义（训诂学）'),
('201','H14','语法'),
('202','H15','写作、修辞'),
('203','H159','翻译'),
('204','H16','字书、字典、词典'),
('205','H17','方言'),
('206','H19','汉语教学'),
('207','H2','中国少数民族语言'),
('208','H3','常用外国语'),
('209','H31','英语'),
('210','H32','法语'),
('211','H33','德语'),
('212','H34','西班牙语'),
('213','H35','俄语'),
('214','H36','日语'),
('215','H37','阿拉伯语'),
('216','H4','汉藏语系'),
('217','H5','阿尔泰语系'),
('218','H61','南亚语系'),
('219','H62','南印语系'),
('220','H63','南岛语系'),
('221','H64','东北亚诸语言'),
('222','H65','高加索语系'),
('223','H66','乌拉尔语系'),
('224','H67','闪-含语系'),
('225','H7','印欧语系'),
('226','H81','非洲诸语言'),
('227','H83','美洲诸语言'),
('228','H84','大洋州诸语言'),
('229','H9','国际辅助语'),
('230','I','文学'),
('231','I0','文学理论'),
('232','I1','世界文学'),
('233','I106','作品评论和研究'),
('234','I109','文学史文学思想史'),
('235','I11','作品集'),
('236','I2','中国文学'),
('237','I200','方针政策及其阐述'),
('238','I206','文学评论和研究'),
('239','I207','各体文学评论和研究'),
('240','I209','文学史、文学思想史'),
('241','I21','作品集'),
('242','I22','诗歌、韵文'),
('243','I23','戏剧文学'),
('244','I239','曲艺'),
('245','I24','小说'),
('246','I25','报告文学'),
('247','I26','散文'),
('248','I269','杂著'),
('249','I27','民间文学'),
('250','I28','儿童文学'),
('251','I29','少数民族文学'),
('252','I299','宗教文学'),
('253','I3/7','各国文学'),
('254','J','艺术'),
('255','J0','艺术理论'),
('256','J1','世界各国艺术概况'),
('257','J2','绘画'),
('258','J29','书法、篆刻'),
('259','J3','雕塑'),
('260','J4','摄影艺术'),
('261','J5','工艺美术'),
('262','J[59]','建筑艺术'),
('263','J6','音乐'),
('264','J7','舞蹈'),
('265','J8','戏剧艺术'),
('266','J9','电影、电视艺术'),
('267','K','历史、地理'),
('268','K0','史学理论'),
('269','K01','史学的哲学基础'),
('270','K02','社会发展理论'),
('271','K03','史学专著'),
('272','K04','年代学'),
('273','K05','史料学'),
('274','K06','历史研究'),
('275','K09','史学史'),
('276','K1','世界史'),
('277','K10','通史'),
('278','K11','上古史'),
('279','K12','古代史'),
('280','K13','中世纪史'),
('281','K14','近代史'),
('282','K15','现代史'),
('283','K18','民族史志'),
('284','K2','中国史'),
('285','K20','通史'),
('286','K21','原始社会'),
('287','K22','奴隶社会'),
('288','K23','封建社会'),
('289','K25','半殖民地、半封建社会'),
('290','K27','中华人民共和国时期'),
('291','K29','地方史志'),
('292','K3','亚洲史'),
('293','K4','非洲史'),
('294','K5','欧洲史'),
('295','K6','大洋洲史'),
('296','K7','美洲史'),
('297','K81','传记'),
('298','K810','传记研究与编写'),
('299','K811','世界人物传记'),
('300','K82','中国人物传记'),
('301','K833/837','各国人物传记'),
('302','K85','文学考古'),
('303','K[852]','古文献学'),
('304','K853','纹章学'),
('305','K854','考古方法'),
('306','K86','世界文物考古'),
('307','K87','中国文物考古'),
('308','K883/887','各国文物考古'),
('309','K89','风俗习惯'),
('310','K9','地理'),
('311','K90','地理学'),
('312','K91','世界地理'),
('313','K92','中国地理'),
('314','K93/97','各国地理'),
('315','K99','地图'),
('316','N','自然科学总论'),
('317','N0','自然科学理论与方法论'),
('318','N1','自然科学现状及发展'),
('319','N2','自然科学机构、团体、会议'),
('320','N3','自然科学研究方法'),
('321','N4','自然科学教育与普及'),
('322','N5','自然科学丛书、文集、连续出版物'),
('323','N6','自然科学参考工具书'),
('324','N[7]','自然科学文献检索工具'),
('325','N8','自然科学调查、考察'),
('326','N91','自然研究、自然历史'),
('327','N93','非线性科学'),
('328','N94','系统科学'),
('329','N[99]','情报学、情报工作'),
('330','O','数理科学和化学'),
('331','O1','数学'),
('332','O1-0','数学理论'),
('333','O1-8','计算工具'),
('334','O11','古典数学'),
('335','O119','中国数学'),
('336','O12','初等数学'),
('337','O13','高等数学'),
('338','O14','数理逻辑、数学基础'),
('339','O15','代数、数论、组合理论'),
('340','O17','数学分析'),
('341','O18','几何、拓扑'),
('342','O19','动力系统理论'),
('343','O21','概率论与数理统计'),
('344','O22','运筹学'),
('345','O23','控制论、信息论（数学理论）'),
('346','O24','计算数学'),
('347','O29','应用数学'),
('348','O3','力学'),
('349','O31','理论力学'),
('350','O32','振动力学'),
('351','O33','连续介质力学（变形体力学）'),
('352','O34','固体力学'),
('353','O35','流体力学'),
('354','O369','物理力学'),
('355','O37','流变学'),
('356','O38','爆炸力学'),
('357','O39','应用力学'),
('358','O4','物理学'),
('359','O41','理论物理学'),
('360','O42','声学'),
('361','O43','光学'),
('362','O44','电磁学、电动力学'),
('363','O45','无线电物理学'),
('364','O46','真空电子学'),
('365','O469','凝聚态物理学'),
('366','O47','半导体物理学'),
('367','O48','固体物理学'),
('368','O51','低温物理学'),
('369','O52','高压与高温物理学'),
('370','O53','等离子体物理学'),
('371','O55','热学与物质分子运动论'),
('372','O56','分子物理学、原子物理学'),
('373','O57','原子核物理学、高能物理学'),
('374','O59','应用物理学'),
('375','O6','化学'),
('376','O61','无机化学'),
('377','O62','有机化学'),
('378','O63','高分子化学（高聚物）'),
('379','O64','物理化学（理论化学）、化学物理学'),
('380','O65','分析化学'),
('381','O69','应用化学'),
('382','O7','晶体学'),
('383','O71','几何晶体学'),
('384','O72','X射线晶体学'),
('385','O73','晶体物理'),
('386','O74','晶体化学'),
('387','O75','非晶态和类晶态'),
('388','O76','晶体结构'),
('389','O77','晶体缺陷'),
('390','O78','晶体生长'),
('391','O79','晶体物理化学过程'),
('392','O799','应用晶体学'),
('393','P','天文学、地理科学'),
('394','P1','天文学'),
('395','P2','测绘学'),
('396','P3','地球物理学'),
('397','P4','大气科学（气象学）'),
('398','P5','地质学'),
('399','P7','海洋学'),
('400','P9','自然地理学'),
('401','Q','生物科学'),
('402','Q1','普通生物学'),
('403','Q1-0','生命科学总论'),
('404','Q10','生命的起源'),
('405','Q11','生物演化与发展'),
('406','Q13','生物形态学'),
('407','Q14','生态学'),
('408','Q15','生物分布与生物地理学'),
('409','Q16','保护生物学'),
('410','Q17','水生生物学'),
('411','Q18','寄生生物学'),
('412','Q19','生物分类学'),
('413','Q2','细胞生物学'),
('414','Q21','细胞的形成与演化'),
('415','Q[23]','细胞遗传学'),
('416','Q24','细胞形态学'),
('417','Q25','细胞生理学'),
('418','Q26','细胞生物化学'),
('419','Q27','细胞生物物理学'),
('420','Q[291]细胞分子生物学',''),
('421','Q3','遗传学'),
('422','Q31','遗传与变异'),
('423','Q32','杂交与杂种'),
('424','Q[33]','人工选择与自然选择'),
('425','Q34','遗传学分支学科'),
('426','Q[36]','微生物遗传学'),
('427','Q[37]','植物遗传学'),
('428','Q[38]','动物遗传学'),
('429','Q[39]','人类遗传学'),
('430','Q4','生理学'),
('431','Q41','普通生理学'),
('432','Q42','神经生理学'),
('433','Q43','分析器生理学'),
('434','Q44','运动器官生理学'),
('435','Q45','内分泌生理学'),
('436','Q46','循环生理学'),
('437','Q47','呼吸生理学'),
('438','Q48','消化生理学'),
('439','Q491','排泄生理学'),
('440','Q492','生殖生理学'),
('441','Q493','新陈代谢与营养'),
('442','Q494','特殊环境生理学、生态生理学'),
('443','Q495','比较生理学与进化生理学'),
('444','Q5','生物化学'),
('445','Q50','一般性问题'),
('446','Q51','蛋白质'),
('447','Q52','核酸'),
('448','Q53','糖'),
('449','Q54','脂类'),
('450','Q55','酶'),
('451','Q56','维生素'),
('452','Q57','激素'),
('453','Q58','生物体其他化学成分'),
('454','Q591','物质代谢及能量代谢'),
('455','Q592','体液代谢'),
('456','Q593','器官生物化学'),
('457','Q594','比较生物化学'),
('458','Q595','应用生物化学'),
('459','Q6','生物物理学'),
('460','Q61','理论生物物理学'),
('461','Q62','生物声学'),
('462','Q63','生物光学'),
('463','Q64','生物电磁学'),
('464','Q65','生物热学'),
('465','Q66','生物力学'),
('466','67','物体化学生物学'),
('467','Q68','物理因素对生物的作用'),
('468','Q691','辐射生物学（放射生物学）'),
('469','Q[692]','仿生学'),
('470','Q693','空间生物学'),
('471','Q7','分子生物学'),
('472','Q71','生物大分子的结构和功能'),
('473','Q73','生物膜的结构和功能'),
('474','Q74','生物小分子的结构和功能'),
('475','Q75','分子遗传学'),
('476','Q77','生物能的转换'),
('477','Q78','基因工程（遗传工程）'),
('478','Q81','生物工程学（生物技术）'),
('479','Q811','仿生学'),
('480','Q813','细胞工程'),
('481','Q814','酶工程'),
('482','Q819','生物工程应用'),
('483','Q[89]','环境生物学'),
('484','Q91','古生物学'),
('485','Q93','微生物学'),
('486','Q94','植物学'),
('487','Q95','动物学'),
('488','Q96','昆虫学'),
('489','Q98','人类学'),
('490','R','医学、卫生'),
('491','R1','预防医学、卫生学'),
('492','R2','中国医学'),
('493','R3','基础医学'),
('494','R4','临床医学'),
('495','R5','内科学'),
('496','R6','外科学'),
('497','R71','妇产科学'),
('498','R72','儿科学'),
('499','R73','肿瘤学'),
('500','R74','神经病学与精神病学'),
('501','R75','皮肤病学与性科学'),
('502','R76','耳鼻咽喉科学'),
('503','R77','眼科学'),
('504','R78','口腔科学'),
('505','R79','外国民族医学'),
('506','R8','特种医学'),
('507','R9','药学'),
('508','S','农业科学'),
('509','S1','农业基础科学'),
('510','S2','农业工程'),
('511','S3','农学（农艺学）'),
('512','S4','植物保护'),
('513','S5','农作物'),
('514','S6','园艺'),
('515','S7','林业'),
('516','S8','畜牧、动物医学、狩猎、蚕、蜂'),
('517','S9','水产、渔业'),
('518','T','工业技术'),
('519','TB','一般工业技术'),
('520','TD','矿业工程'),
('521','TE','石油、天然气工业'),
('522','TF','冶金工业'),
('523','TG','金属学、金属工艺'),
('524','TH','机械、仪表工业'),
('525','TJ','武器工业'),
('526','TK','动力工程'),
('527','TL','原子能技术'),
('528','TM','电工技术'),
('529','TN','无线电电子学、电信技术'),
('530','TP','自动化技术、计算技术'),
('531','TQ','化学工业'),
('532','TS','轻工业、手工业'),
('533','TU','建筑科学'),
('534','TV','水利工程'),
('535','U','交通运输'),
('536','U1','综合运输'),
('537','U2','铁路运输'),
('538','U4','公路运输'),
('539','U6','水路运输'),
('540','U[8]','航空运输'),
('541','V','航空、航天'),
('542','V1','航空、航天技术的研究与探索'),
('543','V2','航空'),
('544','V4','航天（宇宙航行）'),
('545','V[7]','航空、航天医学'),
('546','X','环境科学、劳动保护科学（安全科学）'),
('547','X1','环境科学基础理论'),
('548','X2','环境保护管理'),
('549','X3','环境综合研究'),
('550','X4','灾害及其防治'),
('551','X5','环境污染及其防治'),
('552','X7','三废处理与综合利用'),
('553','X8','环境质量评价与环境监测'),
('554','X9','安全科学'),
('555','Z','综合性图书'),
('556','Z1','丛书'),
('557','Z2','百科全书、类书'),
('558','Z3','辞典'),
('559','Z4','论文集、全集、选集、杂著'),
('560','Z5','年签、年刊'),
('561','Z6','期刊、连续性出版物'),
('562','Z8','图书目录、文摘、索引');
DROP TABLE IF EXISTS  `wit_user`;
CREATE TABLE `wit_user` (
  `studentId` varchar(30) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `class` varchar(255) DEFAULT NULL,
  `college` varchar(255) DEFAULT NULL,
  `is_admin` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`studentId`),
  KEY `uid` (`studentId`),
  KEY `class` (`class`),
  KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

insert into `wit_user`(`studentId`,`pass`,`name`,`sex`,`class`,`college`,`is_admin`) values
('admin123','admin123','admin','1','admin','1','1');
DROP TABLE IF EXISTS  `wit_user_info`;
CREATE TABLE `wit_user_info` (
  `studentId` char(11) NOT NULL,
  `birthday` date NOT NULL,
  `idcard` varchar(20) NOT NULL,
  `telephone` tinytext,
  PRIMARY KEY (`studentId`),
  UNIQUE KEY `uid` (`studentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS  `xbee_data`;
CREATE TABLE `xbee_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mac` varchar(8) NOT NULL,
  `type` int(1) NOT NULL,
  `value` float(5,2) unsigned NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS  `xbee_list`;
CREATE TABLE `xbee_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mac` varchar(255) NOT NULL,
  `type` varchar(3) NOT NULL,
  `name` varchar(255) NOT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `is_admin` int(1) NOT NULL DEFAULT '0',
  `auto_fetch` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

insert into `xbee_list`(`id`,`mac`,`type`,`name`,`unit`,`is_admin`,`auto_fetch`) values
('1','408B9A2A','1','温度','℃','0','1'),
('2','40C1A78B','3','亮度','V','0','1'),
('3','408B9A2A','2','湿度','%','0','1'),
('4','40C1A8D7','4','烟雾传感器',null,'1','0'),
('5','40C1A787','6','读卡器',null,'1','0'),
('6','E84E061C','14','协调器温度','℃','1','0'),
('7','E84E061C','12','协调器内存','MB','1','0'),
('8','E84E061C','13','协调器负载',null,'1','0'),
('9','40C1A8BA','9','通风扇',null,'1','0'),
('10','40C1A8BA','10','报警器',null,'1','0'),
('11','40C1A78B','11','电灯',null,'1','0'),
('12','40C1A77B','5','人体红外',null,'1','0'),
('13','408B9A2A','17','门磁',null,'1','0'),
('14','40C1A782','18','PM2.5',null,'0','1');
SET FOREIGN_KEY_CHECKS = 1;

/* VIEWS */;
DROP VIEW IF EXISTS `lend_view`;
CREATE VIEW `lend_view` AS select `book`.`tagId` AS `tagId`,`book`.`isbn` AS `isbn`,`book`.`author` AS `author`,`book`.`title` AS `title`,`book`.`publisher` AS `publisher`,`book`.`summary` AS `summary`,`book`.`image` AS `image`,`book`.`time` AS `time`,`lend`.`studentId` AS `studentId`,`lend`.`isReturn` AS `isReturn`,`lend`.`lendTime` AS `lendTime`,`lend`.`returnTime` AS `returnTime` from (`lend` left join `book` on((`lend`.`tagId` = `book`.`tagId`)));

DROP VIEW IF EXISTS `wit_user_info_view`;
CREATE VIEW `wit_user_info_view` AS select `wit_user`.`studentId` AS `studentId`,`wit_user`.`name` AS `name`,`wit_user`.`pass` AS `pass`,`wit_user`.`sex` AS `sex`,`wit_user`.`class` AS `class`,`wit_user`.`college` AS `college`,`wit_user_info`.`birthday` AS `birthday`,`wit_user_info`.`idcard` AS `idcard`,`wit_user_info`.`telephone` AS `telephone`,`student_bind`.`uid` AS `uid` from ((`wit_user` left join `wit_user_info` on((`wit_user`.`studentId` = `wit_user_info`.`studentId`))) left join `student_bind` on((`student_bind`.`studentId` = `wit_user`.`studentId`)));
