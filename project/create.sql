###########################
# Create Professor table
###########################

CREATE TABLE Professors
(
  Prof_ID      	int        NOT NULL AUTO_INCREMENT,
  Prof_LName    char(48)   NULL ,
  Prof_FName	char(48)   NULL ,
  PRIMARY KEY (Prof_ID)
) ENGINE=MyISAM;

#########################
# Create Classes table
#########################

CREATE TABLE Classes
(
  Class_ID           varchar(55)  NOT NULL ,
  Class_Name         varchar(255)  NULL ,
  Class_Description  TEXT  NULL ,
  Semester_Taken     varchar(255)  NULL ,
  Prof_ID            int           NULL ,
  SyllabusFilePath   varchar(255)  NULL ,
  FinalGrade         varchar(1)    NULL ,
  PRIMARY KEY (Class_ID),
  CONSTRAINT fk_Prof_ID FOREIGN KEY (Prof_ID) REFERENCES Professors(Prof_ID)
) ENGINE=MyISAM;
#############################
# Create ClassFiles table
#############################

CREATE TABLE ClassFiles
(
  Class_ID    varchar(55)    NOT NULL ,
  ProjectFile varchar(255)    NULL ,
  CONSTRAINT fk_Class_ID FOREIGN KEY (Class_ID) REFERENCES Classes(Class_ID) ON DELETE CASCADE
) ENGINE=MyISAM;
