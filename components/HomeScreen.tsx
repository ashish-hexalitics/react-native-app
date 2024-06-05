import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { ListItem, Avatar } from "@react-native-material/core";
import { getItem } from "../utils/AsyncStorage";
import AppLoader from "../components/common/AppLoader";
import { LoaderSize} from "../components/common/AppLoader/enums";

const HomeScreen = ({ navigation }: any) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `https://www.api.qapreneur.in/api/v5/jobs/public`
        );
        const result = await response.json();
        setData(result.data.jobList);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    getUser();
    fetchJobs();

  }, []);

  const getUser = async () => {
    const authUser = await getItem("authUser");
    setUser(authUser);
  };

  const renderItem = ({ item }: any) => (
    <ListItem
      leadingMode="image"
      leading={
        <Avatar
          image={{
            uri: "https://www.api.qapreneur.in" + item?.companyDetail?.image,
          }}
        />
      }
      title={item?.jobTitle}
      secondaryText={`${item?.companyDetail?.name} - ${item?.location}`}
      onPress={() => navigation.navigate("JobDetail", { job: item })}
    />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item: any) => item?._id.toString()}
      ListEmptyComponent={
        <AppLoader size={LoaderSize.LARGE} />
      }
    />
  );
};

export default HomeScreen;
