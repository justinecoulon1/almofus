CREATE TABLE Label (
	label_id bigint GENERATED ALWAYS AS IDENTITY,
	fr varchar(5000),
	en varchar(5000),

	CONSTRAINT PK_label PRIMARY KEY (label_id)
);

CREATE TABLE Almofus_User(
	almofus_user_id bigint GENERATED ALWAYS AS IDENTITY,
	name varchar(50) UNIQUE NOT NULL,
	email varchar(50),

	CONSTRAINT PK_almofus_user PRIMARY KEY (almofus_user_id)
);

CREATE TABLE Character (
	character_id bigint GENERATED ALWAYS AS IDENTITY,
	name varchar(50),
	user_id bigint,

	CONSTRAINT PK_character_id PRIMARY KEY (character_id)
);

CREATE TABLE Almanax_Day (
	almanax_day_id bigint GENERATED ALWAYS AS IDENTITY,
	almanax_quest_id bigint,
	character_id bigint,
	is_validated boolean,

	CONSTRAINT PK_almanax_day PRIMARY KEY (almanax_day_id)
);


CREATE TABLE Almanax_Quest (
	almanax_quest_id bigint GENERATED ALWAYS AS IDENTITY,
	dofus_quest_id bigint UNIQUE NOT NULL,
	name_label_id bigint,
	date int,
	kamas_reward float,
	item_id bigint,
	item_quantity int NOT NULL,
	npc_id bigint,
	almanax_bonus_id bigint,
	mobile_event_name varchar(50),
	
	CONSTRAINT PK_almanax_quest PRIMARY KEY (almanax_quest_id)
);

CREATE TABLE Npc (
	npc_id bigint GENERATED ALWAYS AS IDENTITY,
	dofus_npc_id bigint UNIQUE NOT NULL,
	name_label_id bigint,
	
	CONSTRAINT PK_npc PRIMARY KEY (npc_id)
);

CREATE TABLE Almanax_Bonus (
	bonus_id bigint GENERATED ALWAYS AS IDENTITY,
	npc_id bigint,
	name_label_id bigint,
	desc_label_id bigint,
	
	CONSTRAINT PK_bonus PRIMARY KEY (bonus_id)
);

CREATE TABLE Item (
	item_id bigint GENERATED ALWAYS AS IDENTITY,
	dofus_item_id bigint UNIQUE NOT NULL,
	name_label_id bigint,
	level int,
	
	CONSTRAINT PK_item PRIMARY KEY (item_id)
);

CREATE TABLE Almanax_Mobile_Date (
	almanax_mobile_date_id bigint GENERATED ALWAYS AS IDENTITY,
	date int,
	year int,
	quest_id bigint,
	
	CONSTRAINT PK_almanax_mobile_date PRIMARY KEY (almanax_mobile_date_id)
);

ALTER TABLE Character
ADD CONSTRAINT FK_Character_User foreign key (user_id) references Almofus_User (almofus_user_id);

ALTER TABLE Almanax_Day
ADD CONSTRAINT FK_Almanax_Day__Almanax_Quest foreign key (almanax_quest_id) references Almanax_Quest (almanax_quest_id);
ALTER TABLE Almanax_Day
ADD CONSTRAINT FK_Almanax_Day__Character foreign key (character_id) references Character (character_id);


ALTER TABLE Almanax_Quest
ADD CONSTRAINT FK_Almanax_Quest__Item foreign key (item_id) references Item (item_id);
ALTER TABLE Almanax_Quest
ADD CONSTRAINT FK_Almanax_Quest__Npc foreign key (npc_id) references Npc (npc_id);
ALTER TABLE Almanax_Quest
ADD CONSTRAINT FK_Almanax_Quest__Almanax_Bonus foreign key (almanax_bonus_id) references Almanax_Bonus (bonus_id);


ALTER TABLE Almanax_Quest
ADD CONSTRAINT FK_Almanax_Quest__Label__Quest_Name foreign key (name_label_id) references Label (label_id);
ALTER TABLE Item
ADD CONSTRAINT FK_Item__Label__Item_Name foreign key (name_label_id) references Label (label_id);
ALTER TABLE Npc
ADD CONSTRAINT FK_Npc__Label__Npc_Name foreign key (name_label_id) references Label (label_id);
ALTER TABLE Almanax_Bonus
ADD CONSTRAINT FK_Almanax_Bonus__Label__Bonus_Name_Label_Id foreign key (name_label_id) references Label (label_id);
ALTER TABLE Almanax_Bonus
ADD CONSTRAINT FK_Almanax_Bonus__Label__Bonus_Desc_Label_Id foreign key (desc_label_id) references Label (label_id);


ALTER TABLE Almanax_Day 
ADD CONSTRAINT UQ_almanax_day__character_id_quest_id UNIQUE (almanax_quest_id, character_id);

ALTER TABLE Almanax_Mobile_Date 
ADD CONSTRAINT FK_Almanax_Mobile_Date__Quest_Id__Almanax_Quest_Quest_Id 
foreign key (quest_id) references Almanax_Quest (almanax_quest_id);