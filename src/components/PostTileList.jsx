import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PostTile from "./PostTile";
import React from "react";
import theme from "../theme";

const PostTileList = ({ contentList, max }) => {
    const styles = theme.styles.global;

    return (
        <Box>
            
            { contentList.length === 0 ?
                <Flex mt="4em" alignItems="center" textAlign="center" direction="column">
                    <Heading size="xl" >{"No content to show."}</Heading>
                    <Box h="2em" />
                    <Link to="/createPost">
                        <Button variant="primary" maxW="max-content">Create your first post</Button>
                    </Link>
                </Flex>
                :
                
            <><Heading w="50%" pb="1em" borderBottom="solid 1px" borderColor={styles.brand.yellow}>Blog Posts</Heading>
            <Box h="2em" /></>
            }
            {max?
                contentList.filter((post, i) => i < max).map((post, i) => {
                    return <PostTile key={i} type="text" content={{ id:post.id, title: post.title, subtitle: post.description, price: post.paywall ? post.paywall.satsAmount + " sats" : null }} />
                })
                :
                contentList.map((post, i) => {
                    return <PostTile key={i} type="text" content={{ id:post.id, title: post.title, subtitle: post.description, price: post.paywall ? post.paywall.satsAmount + " sats" : null }} />
                })
            }
            { contentList.length >= max ?
                <Link to="/profile/blog-posts"><Button variant="primary" maxW="max-content">View more</Button></Link>
                : null
            }
            <Box h="4em" />

            <Heading w="50%" pb="1em" borderBottom="solid 1px" borderColor={styles.brand.yellow}>Podcasts</Heading>
            <Box h="2em" />
            <PostTile type="audio" content={{ title: "Title", price: "500 sats" }} />


        </Box>
    )

}

export default PostTileList;