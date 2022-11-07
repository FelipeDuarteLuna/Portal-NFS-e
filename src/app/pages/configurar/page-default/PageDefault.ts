export interface PageDefault {

  municipio?: string;
  cod_mun?: string;
  ativo?: string ;
  versao?: string;
  provedor?: string;
  modelo ?: string;
  xml_lote?: any;
  xml_rps?: any;
  xmlconslot?: any;
  xmlconsrps?: any;
  xml_canc?: any;
  xmlTss?: any;
  wsdl_prod?: string;
  wsdl_homo?: string;
  sign_lote?: string;
  sign_rps?: string;
  sign_consr?: string;
  sign_canc?: string;
  xml_depara?: any;
}


/*""cod_mun": "3106200",
    "versao": "1.00",
    "provedor": "bhiss",
    "modelo": "abrasf",
    "xml_lote": "PEVudmlhckxvdGVScHNFbnZpbyB4bWxucz0iaHR0cDovL3d3dy5hYnJhc2Yub3JnLmJyL25mc2UueHNkIj48TG90ZVJwcyB4bWxucz0iaHR0cDovL3d3dy5hYnJhc2Yub3JnLmJyL25mc2UueHNkIiBJZD0iWzFbYWxsdHJpbShfb05mc2U6Y0xvdGUpXTFdIiB2ZXJzYW89IjEuMDAiPjxOdW1lcm9Mb3RlPlsyW2FsbHRyaW0oX29OZnNlOmNMb3RlKV0yXTwvTnVtZXJvTG90ZT48Q25waj5bM1thbGx0cmltKFNQRUQwMDEtPkNOUEopXTNdPC9DbnBqPjxJbnNjcmljYW9NdW5pY2lwYWw+WzRbYWxsdHJpbShTUEVEMDAxQS0+SU0pXTRdPC9JbnNjcmljYW9NdW5pY2lwYWw+PFF1YW50aWRhZGVScHM+MTwvUXVhbnRpZGFkZVJwcz48TGlzdGFScHM+PFJwcz5fX1hNTFJQUzwvUnBzPjwvTGlzdGFScHM+PC9Mb3RlUnBzPjwvRW52aWFyTG90ZVJwc0VudmlvPg==",
    "xml_rps": "PEluZlJwcyB4bWxucz0iaHR0cDovL3d3dy5hYnJhc2Yub3JnLmJyL25mc2UueHNkIiBJZD0iX19HRVRJRENIQVZFIj48SWRlbnRpZmljYWNhb1Jwcz48TnVtZXJvPlsxW2lkZW50aWZpY2FjYW86bnVtZXJvcnBzXTFdPC9OdW1lcm8+PFNlcmllPlsyW2lkZW50aWZpY2FjYW86c2VyaWVycHNdMl08L1NlcmllPjxUaXBvPlszW2lkZW50aWZpY2FjYW86dGlwb10zXTwvVGlwbz48L0lkZW50aWZpY2FjYW9ScHM+PERhdGFFbWlzc2FvPls0W2lkZW50aWZpY2FjYW86ZHRocmVtaXNzYW9dNF08L0RhdGFFbWlzc2FvPjxOYXR1cmV6YU9wZXJhY2FvIHRzc19hdHJpYl9kZXBhcmE9InNpbXBsZXMiPls1W2lkZW50aWZpY2FjYW86dGlwb3RyaWJdNV08L05hdHVyZXphT3BlcmFjYW8+PFJlZ2ltZUVzcGVjaWFsVHJpYnV0YWNhbz5bNltdNl08L1JlZ2ltZUVzcGVjaWFsVHJpYnV0YWNhbz48T3B0YW50ZVNpbXBsZXNOYWNpb25hbD5bN1twcmVzdGFkb3I6c2ltcG5hY103XTwvT3B0YW50ZVNpbXBsZXNOYWNpb25hbD48SW5jZW50aXZhZG9yQ3VsdHVyYWw+WzhbcHJlc3RhZG9yOmluY2VudGN1bHRdOF08L0luY2VudGl2YWRvckN1bHR1cmFsPjxTdGF0dXM+WzlbaWRlbnRpZmljYWNhbzpzaXR1YWNhb3Jwc105XTwvU3RhdHVzPjxScHNTdWJzdGl0dWlkbz48TnVtZXJvPlsxMFtdMTBdPC9OdW1lcm8+PFNlcmllPlsxMVtdMTFdPC9TZXJpZT48VGlwbz5bMTJbXTEyXTwvVGlwbz48L1Jwc1N1YnN0aXR1aWRvPjxTZXJ2aWNvIHRzc19hdHJpYl9sZWdhZG89IltzZXJ2aWNvczpzZXJ2aWNvXSI+PFZhbG9yZXM+PFZhbG9yU2Vydmljb3MgdHNzX2F0cmliX2Zvcm1hdD0iZGVjaW1hbDIiPlsxM1t2YWxvcmVzOnZhbHRvdGRvY10xM108L1ZhbG9yU2Vydmljb3M+PFZhbG9yRGVkdWNvZXMgdHNzX2F0cmliX29icmlnYXQ9Im1haW9yMCI+WzE0W3NlcnZpY29zOnNlcnZpY286dmFsZGVkdV0xNF08L1ZhbG9yRGVkdWNvZXM+PFZhbG9yUGlzIHRzc19hdHJpYl9vYnJpZ2F0PSJtYWlvcjAiPlsxNVtzZXJ2aWNvczpzZXJ2aWNvOnZhbHBpc10xNV08L1ZhbG9yUGlzPjxWYWxvckNvZmlucyB0c3NfYXRyaWJfb2JyaWdhdD0ibWFpb3IwIj5bMTZbc2Vydmljb3M6c2Vydmljbzp2YWxjb2ZdMTZdPC9WYWxvckNvZmlucz48VmFsb3JJbnNzIHRzc19hdHJpYl9vYnJpZ2F0PSJtYWlvcjAiPlsxN1tzZXJ2aWNvczpzZXJ2aWNvOnZhbGluc3NdMTddPC9WYWxvckluc3M+PFZhbG9ySXIgdHNzX2F0cmliX29icmlnYXQ9Im1haW9yMCI+WzE4W3NlcnZpY29zOnNlcnZpY286dmFsaXJdMThdPC9WYWxvcklyPjxWYWxvckNzbGwgdHNzX2F0cmliX29icmlnYXQ9Im1haW9yMCI+WzE5W3NlcnZpY29zOnNlcnZpY286dmFsY3NsbF0xOV08L1ZhbG9yQ3NsbD48SXNzUmV0aWRvPlsyMFtzZXJ2aWNvczpzZXJ2aWNvOmlzc3JldGlkb10yMF08L0lzc1JldGlkbz48VmFsb3JJc3M+WzIxW3NlcnZpY29zOnNlcnZpY286dmFsaXNzXTIxXTwvVmFsb3JJc3M+PFZhbG9ySXNzUmV0aWRvIHRzc19hdHJpYl9vYnJpZ2F0PSJtYWlvcjAiPlsyMltzZXJ2aWNvczpzZXJ2aWNvOnZhbGlzc3JldF0yMl08L1ZhbG9ySXNzUmV0aWRvPjxPdXRyYXNSZXRlbmNvZXMgdHNzX2F0cmliX29icmlnYXQ9Im1haW9yMCI+WzIzW3NlcnZpY29zOnNlcnZpY286b3V0cmFzcmV0XTIzXTwvT3V0cmFzUmV0ZW5jb2VzPjxCYXNlQ2FsY3Vsbz5bMjRbc2Vydmljb3M6c2VydmljbzpiYXNlY2FsY10yNF08L0Jhc2VDYWxjdWxvPjxBbGlxdW90YSB0c3NfYXRyaWJfZm9ybWF0PSJwZXJjZW50dWFsIj5bMjVbc2Vydmljb3M6c2VydmljbzphbGlxdW90YV0yNV08L0FsaXF1b3RhPjxWYWxvckxpcXVpZG9OZnNlPlsyNltzZXJ2aWNvczpzZXJ2aWNvOnZhbGxpcV0yNl08L1ZhbG9yTGlxdWlkb05mc2U+PERlc2NvbnRvSW5jb25kaWNpb25hZG8gdHNzX2F0cmliX29icmlnYXQ9Im1haW9yMCI+WzI3W3NlcnZpY29zOnNlcnZpY286ZGVzY2luY10yN108L0Rlc2NvbnRvSW5jb25kaWNpb25hZG8+PERlc2NvbnRvQ29uZGljaW9uYWRvIHRzc19hdHJpYl9vYnJpZ2F0PSJtYWlvcjAiPlsyOFtzZXJ2aWNvczpzZXJ2aWNvOmRlc2Njb25kXTI4XTwvRGVzY29udG9Db25kaWNpb25hZG8+PC9WYWxvcmVzPjxJdGVtTGlzdGFTZXJ2aWNvPlsyOVtzZXJ2aWNvczpzZXJ2aWNvOmNvZGlnb10yOV08L0l0ZW1MaXN0YVNlcnZpY28+PENvZGlnb0NuYWU+WzMwW3NlcnZpY29zOnNlcnZpY286Y25hZV0zMF08L0NvZGlnb0NuYWU+PENvZGlnb1RyaWJ1dGFjYW9NdW5pY2lwaW8+WzMxW3NlcnZpY29zOnNlcnZpY286Y29kdHJpYl0zMV08L0NvZGlnb1RyaWJ1dGFjYW9NdW5pY2lwaW8+PERpc2NyaW1pbmFjYW8+WzMyW3NlcnZpY29zOnNlcnZpY286ZGlzY3JdMzJdPC9EaXNjcmltaW5hY2FvPjxDb2RpZ29NdW5pY2lwaW8+WzMzW3ByZXN0YWNhbzpjb2RtdW5pYmdlXTMzXTwvQ29kaWdvTXVuaWNpcGlvPjwvU2Vydmljbz48UHJlc3RhZG9yPjxDbnBqPlszNFtwcmVzdGFkb3I6Y3BmY25wal0zNF08L0NucGo+PEluc2NyaWNhb011bmljaXBhbD5bMzVbcHJlc3RhZG9yOmluc2NtdW5dMzVdPC9JbnNjcmljYW9NdW5pY2lwYWw+PC9QcmVzdGFkb3I+PFRvbWFkb3I+PElkZW50aWZpY2FjYW9Ub21hZG9yPjxDcGZDbnBqIHRzc19hdHJpYl9jaG9pY2U9IkNwZixDbnBqIj5bMzZbdG9tYWRvcjpjcGZjbnBqXTM2XTwvQ3BmQ25waj48SW5zY3JpY2FvTXVuaWNpcGFsPlszN1t0b21hZG9yOmluc2NtdW5dMzddPC9JbnNjcmljYW9NdW5pY2lwYWw+PC9JZGVudGlmaWNhY2FvVG9tYWRvcj48UmF6YW9Tb2NpYWw+WzM4W3RvbWFkb3I6cmF6YW9dMzhdPC9SYXphb1NvY2lhbD48RW5kZXJlY28+PEVuZGVyZWNvPlszOVt0b21hZG9yOmxvZ3JhZG91cm9dMzldPC9FbmRlcmVjbz48TnVtZXJvPls0MFt0b21hZG9yOm51bWVuZF00MF08L051bWVybz48Q29tcGxlbWVudG8+WzQxW3RvbWFkb3I6Y29tcGxlbmRdNDFdPC9Db21wbGVtZW50bz48QmFpcnJvPls0Mlt0b21hZG9yOmJhaXJyb100Ml08L0JhaXJybz48Q29kaWdvTXVuaWNpcGlvPls0M1t0b21hZG9yOmNvZG11bmliZ2VdNDNdPC9Db2RpZ29NdW5pY2lwaW8+PFVmPls0NFt0b21hZG9yOnVmXTQ0XTwvVWY+PENlcD5bNDVbdG9tYWRvcjpjZXBdNDVdPC9DZXA+PC9FbmRlcmVjbz48Q29udGF0bz48VGVsZWZvbmUgdHNzX2F0cmliX2dldF9wYXRoPSJzaW1wbGVzIj5bNDZbdG9tYWRvcl00Nl08L1RlbGVmb25lPjxFbWFpbD5bNDdbdG9tYWRvcjplbWFpbF00N108L0VtYWlsPjwvQ29udGF0bz48L1RvbWFkb3I+PEludGVybWVkaWFyaW9TZXJ2aWNvPjxSYXphb1NvY2lhbD5bNDhbaW50ZXJtZWRpYXJpbzpyYXphb100OF08L1JhemFvU29jaWFsPjxDcGZDbnBqIHRzc19hdHJpYl9jaG9pY2U9IkNwZixDbnBqIj5bNDlbaW50ZXJtZWRpYXJpbzpjcGZjbnBqXTQ5XTwvQ3BmQ25waj48SW5zY3JpY2FvTXVuaWNpcGFsIHRzc19hdHJpYl9vYnJpZ2F0PSJtYWlvcjAiPls1MFtpbnRlcm1lZGlhcmlvOmluc2NtdW5dNTBdPC9JbnNjcmljYW9NdW5pY2lwYWw+PC9JbnRlcm1lZGlhcmlvU2Vydmljbz48Q29uc3RydWNhb0NpdmlsPjxDb2RpZ29PYnJhPls1MVtjb25zdHJ1Y2FvOmNvZGlnb29icmFdNTFdPC9Db2RpZ29PYnJhPjxBcnQ+WzUyW2NvbnN0cnVjYW86YXJ0XTUyXTwvQXJ0PjwvQ29uc3RydWNhb0NpdmlsPjwvSW5mUnBzPg==",
    "xmlconslot": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48Q29uc3VsdGFyTG90ZVJwc0VudmlvIHhtbG5zPSJodHRwOi8vd3d3LmFicmFzZi5vcmcuYnIvbmZzZS54c2QiPjxQcmVzdGFkb3I+PENucGo+WzFbQUxMVFJJTShTUEVEMDAxLT5DTlBKKV0xXTwvQ25waj48SW5zY3JpY2FvTXVuaWNpcGFsPlsyW2FsbHRyaW0oU1BFRDAwMUEtPklNKV0yXTwvSW5zY3JpY2FvTXVuaWNpcGFsPjwvUHJlc3RhZG9yPjxQcm90b2NvbG8+WzNbQWxsdHJpbShTUEVEMDUzLT5SRUNJQk8pXTNdPC9Qcm90b2NvbG8+PC9Db25zdWx0YXJMb3RlUnBzRW52aW8+",
    "xmlconsrps": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48Q29uc3VsdGFyTmZzZVJwc0VudmlvIHhtbG5zPSJodHRwOi8vd3d3LmFicmFzZi5vcmcuYnIvbmZzZS54c2QiPjxJZGVudGlmaWNhY2FvUnBzPjxOdW1lcm8+WzFbQWxsdHJpbShTUEVEMDUxLT5SUFMpXTFdPC9OdW1lcm8+PFNlcmllPlsyW0FsbHRyaW0oU1BFRDA1MS0+U0VSSUVfUlBTKV0yXTwvU2VyaWU+PFRpcG8+WzNbQWxsdHJpbShTUEVEMDUxLT5USVBPX1JQUyldM108L1RpcG8+PC9JZGVudGlmaWNhY2FvUnBzPjxQcmVzdGFkb3I+PENucGo+WzRbYWxsdHJpbShTUEVEMDAxLT5DTlBKKV00XTwvQ25waj48SW5zY3JpY2FvTXVuaWNpcGFsPls1W2FsbHRyaW0oU1BFRDAwMUEtPklNKV01XTwvSW5zY3JpY2FvTXVuaWNpcGFsPjwvUHJlc3RhZG9yPjwvQ29uc3VsdGFyTmZzZVJwc0VudmlvPg==",
    "xml_canc": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48Q2FuY2VsYXJOZnNlRW52aW8geG1sbnM9Imh0dHA6Ly93d3cuYWJyYXNmLm9yZy5ici9uZnNlLnhzZCI+PFBlZGlkbyB4bWxucz0iaHR0cDovL3d3dy5hYnJhc2Yub3JnLmJyL25mc2UueHNkIj48SW5mUGVkaWRvQ2FuY2VsYW1lbnRvIHhtbG5zPSJodHRwOi8vd3d3LmFicmFzZi5vcmcuYnIvbmZzZS54c2QiIElkPSJbMVtfb05mc2U6Y0xvdGVdMV0iPjxJZGVudGlmaWNhY2FvTmZzZT48TnVtZXJvPlsyW2FsbHRyaW0oU1BFRDA1MS0+TkZTRSldMl08L051bWVybz48Q25waj5bM1thbGx0cmltKFNQRUQwMDEtPkNOUEopXTNdPC9DbnBqPjxJbnNjcmljYW9NdW5pY2lwYWw+WzRbYWxsdHJpbShTUEVEMDAxQS0+SU0pXTRdPC9JbnNjcmljYW9NdW5pY2lwYWw+PENvZGlnb011bmljaXBpbz5bNVthbGx0cmltKFNQRUQwMDFBLT5DT0RfTVVOKV01XTwvQ29kaWdvTXVuaWNpcGlvPjwvSWRlbnRpZmljYWNhb05mc2U+PENvZGlnb0NhbmNlbGFtZW50bz4yPC9Db2RpZ29DYW5jZWxhbWVudG8+PC9JbmZQZWRpZG9DYW5jZWxhbWVudG8+PC9QZWRpZG8+PC9DYW5jZWxhck5mc2VFbnZpbz4=",
    "wsdl_prod": "aHR0cHM6Ly9iaGlzc2RpZ2l0YWwucGJoLmdvdi5ici9iaGlzcy13cy9uZnNlP3dzZGw=",
    "wsdl_homo": "aHR0cHM6Ly9iaGlzc2hvbW9sb2dhLnBiaC5nb3YuYnIvYmhpc3Mtd3MvbmZzZT93c2Rs",
    "sign_lote": "TG90ZVJwcw==",
    "sign_rps": "SW5mUnBz",
    "sign_canc": "SW5mUGVkaWRvQ2FuY2VsYW1lbnRv",
    "sign_consr": "",
    "xml_depara": "eyAiaXRlbXMiOiBbeyAiaWRfcGF0aCI6ICJbNVtpZGVudGlmaWNhY2FvOnRpcG90cmliXTVdIiwgImNvbmRpY2lvbmFpcyI6IFt7ICIxIjogeyAiZm9ybXVsYSI6ICJhbGx0cmltKGNDb250ZXVkbykgPT0gJzYnIiwgInJldHVybiI6ICIxIiB9LCAiMiI6IHsgImZvcm11bGEiOiAiYWxsdHJpbShjQ29udGV1ZG8pID09ICcyJyIsICJyZXR1cm4iOiAiMiIgfSwgIjMiOiB7ICJmb3JtdWxhIjogImFsbHRyaW0oY0NvbnRldWRvKSA9PSAnMSciLCAicmV0dXJuIjogIjMiIH0sICI0IjogeyAiZm9ybXVsYSI6ICJhbGx0cmltKGNDb250ZXVkbykgPT0gJzMnIiwgInJldHVybiI6ICI0IiB9LCAiNSI6IHsgImZvcm11bGEiOiAiYWxsdHJpbShjQ29udGV1ZG8pID09ICc0JyIsICJyZXR1cm4iOiAiNSIgfSwgIjYiOiB7ICJmb3JtdWxhIjogImFsbHRyaW0oY0NvbnRldWRvKSA9PSAnNSciLCAicmV0dXJuIjogIjciIH0sICI3IjogeyAiZm9ybXVsYSI6ICJhbGx0cmltKGNDb250ZXVkbykgPT0gJzEyJyIsICJyZXR1cm4iOiAiNiIgfSwgIjgiOiB7ICJmb3JtdWxhIjogIi5ULiIsICJyZXR1cm4iOiAiOTkiIH0gfSBdIH0sIHsgImlkX3BhdGgiOiAiWzQ2W3RvbWFkb3JdNDZdIiwgImNvbmRpY2lvbmFpcyI6IFt7ICIxIjogeyAiZm9ybXVsYSI6ICJ0eXBlKCdvWG1sVW5pY286X3JwczpfdG9tYWRvcjpfZGRkJyk8PidVJyAuYW5kLiB0eXBlKCdvWG1sVW5pY286X3JwczpfdG9tYWRvcjpfdGVsZWZvbmUnKTw+J1UnIiwgImV4ZWMiOiAic3Vic3RyKG9YbWxVbmljbzpfcnBzOl90b21hZG9yOl9kZGQ6dGV4dCArIG9YbWxVbmljbzpfcnBzOl90b21hZG9yOl90ZWxlZm9uZTp0ZXh0LDEsMTEpIiB9IH0gXSB9LCB7ICJTUEVEMDUxIjogeyAiUlBTIjogeyAiZm9ybXVsYSI6ICJUeXBlKCdvWG1sRGVzdDpfSU5GUlBTOl9JREVOVElGSUNBQ0FPUlBTOl9OVU1FUk8nKTw+J1UnIiwgImV4ZWMiOiAib1htbERlc3Q6X0lORlJQUzpfSURFTlRJRklDQUNBT1JQUzpfTlVNRVJPOlRFWFQiIH0sICJTRVJJRV9SUFMiOiB7ICJmb3JtdWxhIjogIlR5cGUoJ29YbWxEZXN0Ol9JTkZSUFM6X0lERU5USUZJQ0FDQU9SUFM6X1NFUklFJyk8PidVJyIsICJleGVjIjogIlN1YlN0cihBbGx0cmltKG9YbWxEZXN0Ol9JTkZSUFM6X0lERU5USUZJQ0FDQU9SUFM6X1NFUklFOlRFWFQpLDEsNSkiIH0sICJUSVBPX1JQUyI6IHsgImZvcm11bGEiOiAiVHlwZSgnb1htbERlc3Q6X0lORlJQUzpfSURFTlRJRklDQUNBT1JQUzpfVElQTycpPD4nVSciLCAiZXhlYyI6ICJBbGx0cmltKG9YbWxEZXN0Ol9JTkZSUFM6X0lERU5USUZJQ0FDQU9SUFM6X1RJUE86VEVYVCkiIH0sICJDTlBKREVTVCI6IHsgImZvcm11bGEiOiAiVHlwZSgnb1htbERlc3Q6X0lORlJQUzpfVE9NQURPUjpfSURFTlRJRklDQUNBT1RPTUFET1I6X0NQRkNOUEo6X0NOUEonKTw+J1UnIiwgImV4ZWMiOiAiQWxsdHJpbShvWG1sRGVzdDpfSU5GUlBTOl9UT01BRE9SOl9JREVOVElGSUNBQ0FPVE9NQURPUjpfQ1BGQ05QSjpfQ05QSjpURVhUKSIgfSwgIkRBVEVfRU1JUyI6IHsgImZvcm11bGEiOiAiVHlwZSgnb1htbERlc3Q6X0lORlJQUzpfREFUQUVNSVNTQU8nKTw+J1UnIiwgImV4ZWMiOiAic3RyVHJhbihzdWJTdHIob1htbERlc3Q6X0lORlJQUzpfREFUQUVNSVNTQU86VEVYVCwxLDEwKSwnLScsJycpIiB9LCAiVElNRV9FTUlTIjogeyAiZm9ybXVsYSI6ICJUeXBlKCdvWG1sRGVzdDpfSU5GUlBTOl9EQVRBRU1JU1NBTycpPD4nVSciLCAiZXhlYyI6ICJzdWJTdHIob1htbERlc3Q6X0lORlJQUzpfREFUQUVNSVNTQU86VEVYVCwxMiw4KSIgfSB9IH0sIHsgIl9fR0VUSURDSEFWRSI6IHsgImV4ZWMiOiAiJ05TZScrZ2V0VUZDb2RlKFNQRUQwMDEtPlVGKStTdWJTdHIob1htbFVuaWNvOl9ycHM6X2lkZW50aWZpY2FjYW86X2R0aHJlbWlzc2FvOlRFWFQsMywyKStTdWJTdHIob1htbFVuaWNvOl9ycHM6X2lkZW50aWZpY2FjYW86X2R0aHJlbWlzc2FvOlRFWFQsNiwyKStBbGx0cmltKFNQRUQwMDEtPkNOUEopKyc1NicrU3RyWmVybyhWYWwoU3ViU3RyKG9YbWxVbmljbzpfcnBzOl9pZGVudGlmaWNhY2FvOl9zZXJpZXJwczpURVhULDEsMykpLDMpK1N0clplcm8oVmFsKFN1YlN0cihvWG1sVW5pY286X3JwczpfaWRlbnRpZmljYWNhbzpfbnVtZXJvcnBzOlRFWFQsMSw5KSksOSkrU3RyWmVybyhWYWwoU3ViU3RyKG9YbWxVbmljbzpfcnBzOl9pZGVudGlmaWNhY2FvOl9udW1lcm9ycHM6VEVYVCwxLDkpKSw5KSIgfSB9IF0gfQ=="

export interface IRps {

  municipio: IRps2[];

}

export interface IRps2 {

  cod_mun?: string;
  provedor?: string;
  versao?: string;
  xml_rps?: any;
  xml_canc?: any;
}
*/


