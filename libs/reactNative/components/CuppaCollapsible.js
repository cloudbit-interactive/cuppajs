import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { log } from "../../../../cuppa/cuppa";
import { HeaderBar } from "../../../components/HeaderBar";
import { GraphQL } from "../../../controllers/GraphQL";
import { StylesVariables } from "../../../styles/StylesApp";
import { CuppaCollapsible } from "../../../../cuppa/reactNative/components/CuppaCollapsible";

export function FormRecord({formId, formRecordId, close}){
  const [form, setForm] = useState();

  useEffect(() => {
    loadForm().then();
  }, []);

  useEffect(() => {
    getUniqueFieldValues().then()
  }, []);

  async function loadForm(){
    let formRes = await GraphQL.query(`#graphql
      {
        form(id: "${formId}"){
          id, name frequency
          pages {
            id, name, display_order
            pageFields {
              id, name, display_on_list, display_order, data_type, is_filter
            }
          }
        }
      }
    `)
    setForm(formRes?.data?.form);
  }

  async function getUniqueFieldValues(){
    if(!formId || !formRecordId) return null;
  }

  log(form)
  return(
    <>
      <HeaderBar backCallback={close} title={form?.name} />
      <View style={{padding:StylesVariables.padding}}>
        {(form?.pages || []).map(page=>{
          return (
            <CuppaCollapsible
              header={<Text>{page?.name}</Text>}
              arrowIcon={require("../../../media/images/arrow-down.png")}
              arrowWrapStyle={{backgroundColor:'rgba(214,227,255,0.62)', justifyContent:'flex-start', paddingTop:20}}
              open={true}
              animate={false}
              content={
                <View>
                  <Text>ddd</Text>
                </View>
              }
            >
            </CuppaCollapsible>
          )
        })}
      </View>
    </>
  )
}
