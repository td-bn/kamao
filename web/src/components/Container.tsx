import { SimpleGrid } from "@chakra-ui/react"

import Main from './Main';
import Nav from './Nav';

function Page() {

  return (
    <SimpleGrid bg="teal.100" p="24" pt="4" m={20} mt={10} columns={1} spacing={20}> 
      <Nav />
      <Main />
    </SimpleGrid>
  );
}

export default Page
