export interface MunGet{
  Descricao: string;
  name: string;
  code: string;

  DESC_MUN?:  string;
  VERSAO?:    string;
  UF?:        string;
  PROVEDOR?:  string;
  MODELO?:    string;
  XML_LOTE?:  string;
  XML_RPS?:   string;
  XMLCONSLOT?:string;
  XMLCONSRPS?:string;
  XML_CANC?:  string;
  WSDL_PROD?: string;
  WSDL_HOMO?: string;
  SIGN_LOTE?: string;
  SIGN_RPS?:  string;
  SIGN_CANC?: string;
  SIGN_CONSR?:string;
  MUNICIPIO?: any;

}
export interface MunIbge{
  id?:string;
  nome?:string;
  microrregiao?:string;
  regiaoimediata?:string;
}
